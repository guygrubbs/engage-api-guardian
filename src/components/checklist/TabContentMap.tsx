
import { ChecklistItem } from "./ChecklistItem";

export const TabContentMap = {
  market: (
    <div className="space-y-4">
      <ChecklistItem
        title="Market Overview"
        items={[
          "Industry and sector of operation",
          "Total Addressable Market (TAM) size",
          "Key market trends and opportunities"
        ]}
      />
      <ChecklistItem
        title="Target Customer Profile"
        items={[
          "Description of ideal customer segments",
          "Customer pain points and challenges",
          "Customer purchasing behavior"
        ]}
      />
    </div>
  ),
  competition: (
    <div className="space-y-4">
      <ChecklistItem
        title="Competitive Analysis"
        items={[
          "Key competitors and their positioning",
          "Competitive strengths and weaknesses",
          "Your unique competitive advantages"
        ]}
      />
      <ChecklistItem
        title="Market Position"
        items={[
          "Industry benchmarks and standards",
          "Feature comparison with competitors",
          "Market differentiation strategy"
        ]}
      />
    </div>
  ),
  financial: (
    <div className="space-y-4">
      <ChecklistItem
        title="Revenue Metrics"
        items={[
          "Annual and Monthly Recurring Revenue",
          "Revenue streams breakdown",
          "Year-over-year growth percentages"
        ]}
      />
      <ChecklistItem
        title="Financial Health"
        items={[
          "Profit margins and cost structure",
          "Funding history and capital structure",
          "Key financial milestones"
        ]}
      />
    </div>
  ),
  team: (
    <div className="space-y-4">
      <ChecklistItem
        title="Leadership Team"
        items={[
          "Leadership profiles and experience",
          "Key team member backgrounds",
          "Notable achievements and expertise"
        ]}
      />
      <ChecklistItem
        title="Team Structure"
        items={[
          "Current team composition",
          "Hiring plans and growth strategy",
          "Identified skill gaps and solutions"
        ]}
      />
    </div>
  ),
  customers: (
    <div className="space-y-4">
      <ChecklistItem
        title="Customer Insights"
        items={[
          "Customer feedback and testimonials",
          "Case studies and success stories",
          "Customer satisfaction metrics"
        ]}
      />
      <ChecklistItem
        title="Customer Success"
        items={[
          "Retention rates and trends",
          "Customer satisfaction scores",
          "Notable client relationships"
        ]}
      />
    </div>
  ),
  acquisition: (
    <div className="space-y-4">
      <ChecklistItem
        title="Acquisition Strategy"
        items={[
          "Target audience definition",
          "Marketing and sales channels",
          "Customer acquisition costs"
        ]}
      />
      <ChecklistItem
        title="Sales Process"
        items={[
          "Sales funnel metrics",
          "Conversion rates and KPIs",
          "Sales enablement tools"
        ]}
      />
    </div>
  )
} as const;

export type TabKey = keyof typeof TabContentMap;
