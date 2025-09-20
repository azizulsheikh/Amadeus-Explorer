'use client';

import { useState } from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarTrigger,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { AmadeusApi } from '@/lib/amadeus-apis';
import { AMADEUS_APIS } from '@/lib/amadeus-apis';
import RequestBuilder from './request-builder';
import { executeApiAndMapData } from '@/app/actions';
import ResponseDisplay from './response-display';
import UiPreview from './ui-preview';
import Logo from './logo';
import { Card, CardContent, CardHeader, CardDescription } from './ui/card';
import { Eye, FileJson, KeyRound, LayoutGrid, Server, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

type ApiResult = {
  raw: object;
  mapped: string;
};

export default function ApiExplorer() {
  const [selectedApi, setSelectedApi] = useState<AmadeusApi | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiResult, setApiResult] = useState<ApiResult | null>(null);
  const [useMockData, setUseMockData] = useState(true);
  const { toast } = useToast();

  const handleApiSelect = (api: AmadeusApi) => {
    setSelectedApi(api);
    setApiResult(null);
  };

  const handleRequestSubmit = async (params: Record<string, any>) => {
    if (!selectedApi) return;

    setIsLoading(true);
    setApiResult(null);
    const result = await executeApiAndMapData(selectedApi.id, params, useMockData);
    setIsLoading(false);

    if ('error' in result) {
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: result.error,
      });
    } else {
      setApiResult(result);
    }
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Logo className="size-8 text-primary" />
            <h2 className="text-xl font-headline font-semibold">Amadeus Explorer</h2>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {AMADEUS_APIS.map((api) => (
              <SidebarMenuItem key={api.id}>
                <SidebarMenuButton
                  onClick={() => handleApiSelect(api)}
                  isActive={selectedApi?.id === api.id}
                  className="justify-start"
                >
                  <api.icon className="size-4" />
                  <span>{api.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur-sm sticky top-0 z-20">
          <SidebarTrigger />
          {selectedApi && (
            <div className="flex-1">
              <h1 className="text-xl font-headline font-bold">{selectedApi.name}</h1>
              <p className="text-sm text-muted-foreground">{selectedApi.description}</p>
            </div>
          )}
        </header>
        <main className="flex-1 p-4 md:p-6">
          <Card className="mb-6">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <KeyRound className="size-6 text-primary" />
                        <div>
                            <h3 className="text-lg font-headline font-semibold">Data Source</h3>
                            <p className="text-sm text-muted-foreground">Switch between mock and live API data.</p>
                        </div>
                    </div>
                     <div className="flex items-center space-x-2">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Server className="size-5 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>Use Mock Data</TooltipContent>
                        </Tooltip>
                        <Switch
                            id="mock-data-switch"
                            checked={!useMockData}
                            onCheckedChange={(checked) => setUseMockData(!checked)}
                        />
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Wand2 className="size-5 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>Use Live Data</TooltipContent>
                        </Tooltip>
                    </div>
                </div>
            </CardHeader>
            {useMockData && (
              <CardContent>
                <div className="p-4 rounded-md bg-accent border border-accent-foreground/20 text-accent-foreground font-semibold text-sm">
                  Mock data is enabled. The app will not make real API calls.
                </div>
              </CardContent>
            )}
            {!useMockData && (
              <CardContent>
                <div className="p-4 rounded-md bg-primary/10 border border-primary/20 text-primary-foreground/80 text-sm">
                  Live data is enabled. Ensure your <code className="font-mono bg-primary/20 px-1 py-0.5 rounded-sm">.env</code> file is configured with your Amadeus API credentials.
                </div>
              </CardContent>
            )}
          </Card>

          {selectedApi ? (
            <Tabs defaultValue="request">
              <TabsList className="grid w-full grid-cols-3 max-w-lg mx-auto">
                <TabsTrigger value="request"><Wand2 className="mr-2"/>Request Builder</TabsTrigger>
                <TabsTrigger value="response"><FileJson className="mr-2"/>Raw Response</TabsTrigger>
                <TabsTrigger value="preview"><Eye className="mr-2"/>UI Preview</TabsTrigger>
              </TabsList>
              <TabsContent value="request">
                <RequestBuilder api={selectedApi} onSubmit={handleRequestSubmit} isLoading={isLoading} />
              </TabsContent>
              <TabsContent value="response">
                <ResponseDisplay data={apiResult?.raw} isLoading={isLoading} />
              </TabsContent>
              <TabsContent value="preview">
                <UiPreview data={apiResult?.mapped} apiId={selectedApi.id} isLoading={isLoading} />
              </TabsContent>
            </Tabs>
          ) : (
            <div className="flex h-[calc(100vh-22rem)] items-center justify-center">
              <Card className="w-full max-w-md text-center">
                <CardContent className="p-10">
                  <LayoutGrid className="mx-auto size-12 text-primary" />
                  <h3 className="mt-4 text-xl font-headline font-semibold">Welcome to Amadeus Explorer</h3>
                  <p className="mt-2 text-muted-foreground">Select an API from the sidebar to get started.</p>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
