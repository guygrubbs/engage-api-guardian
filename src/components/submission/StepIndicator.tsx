
interface StepProps {
  number: number;
  label: string;
  active: boolean;
}

export const StepIndicator = ({ steps, currentStep }: { steps: StepProps[], currentStep: number }) => {
  return (
    <div className="mb-8">
      <div className="grid grid-cols-3 gap-2">
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col items-center">
            <div className={`rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-200 ${
              step.number === currentStep ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              {step.number}
            </div>
            <span className="text-xs mt-1 text-center">{step.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
