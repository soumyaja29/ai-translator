"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { translateText, type TranslateTextInput } from "@/ai/flows/translate-text";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { supportedLanguages, type Language } from "@/lib/languages";
import { useToast } from "@/hooks/use-toast";
import { ArrowRightLeft, Copy, Loader2, Languages } from "lucide-react";

const translationFormSchema = z.object({
  inputText: z.string().min(1, { message: "Please enter text to translate." }).max(2000, { message: "Text must be 2000 characters or less."}),
  sourceLanguage: z.string().min(1, { message: "Please select a source language." }),
  targetLanguage: z.string().min(1, { message: "Please select a target language." }),
}).refine(data => data.sourceLanguage !== data.targetLanguage, {
  message: "Source and target languages must be different.",
  path: ["targetLanguage"],
});

type TranslationFormValues = z.infer<typeof translationFormSchema>;

export function TranslatorForm() {
  const [outputText, setOutputText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const form = useForm<TranslationFormValues>({
    resolver: zodResolver(translationFormSchema),
    defaultValues: {
      inputText: "",
      sourceLanguage: "en",
      targetLanguage: "es",
    },
  });

  async function onSubmit(data: TranslationFormValues) {
    setIsLoading(true);
    setOutputText("");
    try {
      const input: TranslateTextInput = {
        text: data.inputText,
        sourceLanguage: supportedLanguages.find(lang => lang.code === data.sourceLanguage)?.name || data.sourceLanguage,
        targetLanguage: supportedLanguages.find(lang => lang.code === data.targetLanguage)?.name || data.targetLanguage,
      };
      const result = await translateText(input);
      setOutputText(result.translatedText);
    } catch (error) {
      console.error("Translation error:", error);
      toast({
        variant: "destructive",
        title: "Translation Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText)
      .then(() => {
        toast({
          title: "Copied!",
          description: "Translated text copied to clipboard.",
        });
      })
      .catch(err => {
        console.error("Failed to copy text: ", err);
        toast({
          variant: "destructive",
          title: "Copy Failed",
          description: "Could not copy text to clipboard.",
        });
      });
  };

  const handleSwapLanguages = () => {
    const currentSource = form.getValues("sourceLanguage");
    const currentTarget = form.getValues("targetLanguage");
    form.setValue("sourceLanguage", currentTarget);
    form.setValue("targetLanguage", currentSource);
    // Optionally swap inputText and outputText if desired, or clear outputText
    const currentInputText = form.getValues("inputText");
    if (outputText && currentInputText) {
        form.setValue("inputText", outputText);
        setOutputText(currentInputText);
    } else if (outputText) {
        form.setValue("inputText", outputText);
        setOutputText("");
    }
  };

  return (
    <Card className="w-full shadow-xl">
      <CardHeader>
        <div className="flex items-center space-x-2 mb-2">
          <Languages className="h-6 w-6 text-primary" />
          <CardTitle className="text-2xl">Translate Text</CardTitle>
        </div>
        <CardDescription>Select your languages and enter text to translate.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <FormField
                control={form.control}
                name="sourceLanguage"
                render={({ field }) => (
                  <FormItem className="flex-1 w-full sm:w-auto">
                    <FormLabel>From</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select source language" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {supportedLanguages.map((lang: Language) => (
                          <SelectItem key={lang.code} value={lang.code}>
                            {lang.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleSwapLanguages}
                className="self-center sm:mt-6 shrink-0"
                aria-label="Swap languages"
              >
                <ArrowRightLeft className="h-5 w-5 text-primary" />
              </Button>
              <FormField
                control={form.control}
                name="targetLanguage"
                render={({ field }) => (
                  <FormItem className="flex-1 w-full sm:w-auto">
                    <FormLabel>To</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select target language" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {supportedLanguages.map((lang: Language) => (
                          <SelectItem key={lang.code} value={lang.code}>
                            {lang.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="inputText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter text to translate</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Type or paste your text here..."
                      className="min-h-[120px] resize-y focus:ring-accent"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div>
              <FormLabel>Translated text</FormLabel>
              <Textarea
                placeholder="Translation will appear here..."
                value={outputText}
                readOnly
                className="min-h-[120px] resize-y mt-2 bg-muted/50"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6">
            <Button type="submit" disabled={isLoading} className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Translating...
                </>
              ) : (
                "Translate"
              )}
            </Button>
            {outputText && (
              <Button type="button" variant="outline" onClick={handleCopy} className="w-full sm:w-auto">
                <Copy className="mr-2 h-4 w-4" />
                Copy Translation
              </Button>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
