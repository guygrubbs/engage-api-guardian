import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { BusinessInfoInputs, businessInfoSchema } from "@/schemas/pitch-submission";

interface BusinessInfoStepProps {
  defaultValues?: Partial<BusinessInfoInputs>;
  onBack: () => void;
  onSubmit: (data: BusinessInfoInputs) => void;
}

export const BusinessInfoStep = ({ defaultValues, onBack, onSubmit }: BusinessInfoStepProps) => {
  const form = useForm<BusinessInfoInputs>({
    resolver: zodResolver(businessInfoSchema),
    defaultValues: defaultValues || {
      problemStatement: "",
      solution: "",
      tractionMetrics: "",
    },
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Business Information</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="problemStatement"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Problem Statement *</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="What problem are you solving?"
                    className="min-h-[100px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="solution"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Solution *</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="How does your product/service solve this problem?"
                    className="min-h-[100px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tractionMetrics"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Traction & Metrics</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Current users, revenue, growth rate, etc."
                    className="min-h-[100px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button type="submit">Submit Pitch</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};