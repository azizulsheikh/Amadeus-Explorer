'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Skeleton } from './ui/skeleton';
import { Check, Clipboard, FileJson } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

interface ResponseDisplayProps {
  data: any;
  isLoading: boolean;
}

export default function ResponseDisplay({ data, isLoading }: ResponseDisplayProps) {
  const [hasCopied, setHasCopied] = useState(false);

  const copyToClipboard = () => {
    if (!data) return;
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Raw API Response</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Raw API Response</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-muted-foreground py-12">
          <FileJson className="mx-auto size-12" />
          <p className="mt-4">The raw JSON response from the API will be displayed here.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Raw API Response</CardTitle>
        <Button variant="ghost" size="icon" onClick={copyToClipboard}>
          {hasCopied ? <Check className="size-4" /> : <Clipboard className="size-4" />}
          <span className="sr-only">Copy JSON</span>
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] w-full rounded-md border bg-muted/30 p-4">
          <pre className="text-sm">
            <code>{JSON.stringify(data, null, 2)}</code>
          </pre>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
