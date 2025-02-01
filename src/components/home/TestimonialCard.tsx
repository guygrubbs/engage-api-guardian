import { Card, CardContent } from "@/components/ui/card";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  image: string;
}

const TestimonialCard = ({ quote, author, role, image }: TestimonialCardProps) => (
  <Card className="hover:shadow-lg transition-all duration-300 h-full">
    <CardContent className="pt-6 flex flex-col h-full">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden">
        <img src={image} alt={author} className="w-full h-full object-cover" />
      </div>
      <p className="italic text-muted-foreground mb-4 flex-grow">{quote}</p>
      <div>
        <p className="font-semibold">{author}</p>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
    </CardContent>
  </Card>
);

export default TestimonialCard;