'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { AmadeusApi, ApiParam } from '@/lib/amadeus-apis';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { CalendarIcon, LoaderCircle, Send } from 'lucide-react';
import { Calendar } from './ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface RequestBuilderProps {
  api: AmadeusApi;
  onSubmit: (data: Record<string, any>) => void;
  isLoading: boolean;
}

// Helper to create a dynamic Zod schema
const createSchema = (params: ApiParam[]) => {
  const schemaObject = params.reduce((acc, param) => {
    let fieldSchema: z.ZodTypeAny;

    switch (param.type) {
      case 'date':
        fieldSchema = z.date({
          required_error: `${param.label} is required.`,
        });
        break;
      case 'number':
        fieldSchema = z.coerce.number().min(1, `${param.label} must be at least 1.`);
        break;
      case 'text':
      case 'string':
      default:
        fieldSchema = z.string().min(1, `${param.label} is required.`);
        break;
    }

    if (!param.required) {
      fieldSchema = fieldSchema.optional();
    }
    
    acc[param.name] = fieldSchema;
    return acc;
  }, {} as Record<string, z.ZodTypeAny>);

  return z.object(schemaObject);
};

export default function RequestBuilder({ api, onSubmit, isLoading }: RequestBuilderProps) {
  const formSchema = createSchema(api.params);
  
  const defaultValues = api.params.reduce((acc, param) => {
    if (param.defaultValue) {
      if (param.type === 'date') {
        acc[param.name] = new Date(param.defaultValue);
      } else {
        acc[param.name] = param.defaultValue;
      }
    }
    return acc;
  }, {} as Record<string, any>);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleFormSubmit = (values: z.infer<typeof formSchema>) => {
    const formattedValues = { ...values };
    api.params.forEach(param => {
      if (param.type === 'date' && formattedValues[param.name]) {
        formattedValues[param.name] = format(formattedValues[param.name], 'yyyy-MM-dd');
      }
    });
    onSubmit(formattedValues);
  };
  
  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>API Request Parameters</CardTitle>
        <CardDescription>Fill in the details below to make an API request.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)}>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {api.params.map((param) => (
              <FormField
                key={param.name}
                control={form.control}
                name={param.name as any}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{param.label}</FormLabel>
                    <FormControl>
                      {param.type === 'date' ? (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-full justify-start text-left font-normal',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      ) : (
                        <Input type={param.type} placeholder={param.placeholder} {...field} value={field.value ?? ""} />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading} className="ml-auto">
              {isLoading ? (
                <>
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  Executing...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Execute API Call
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
