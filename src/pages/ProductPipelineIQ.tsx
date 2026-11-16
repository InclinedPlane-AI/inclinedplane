import PageLayout from "@/components/PageLayout";
import SEOHead from "@/components/SEOHead";
import PipelineIQ from "@/components/products/PipelineIQ";
import { ProductCTA } from "@/components/products/ProductChrome";

const ProductPipelineIQ = () => (
  <PageLayout>
    <SEOHead
      title="PipelineIQ — Pipeline Monitoring & ETL Debugging"
      description="PipelineIQ is a read-only monitoring, alerting and ETL-debugging portal that turns hundreds of pipeline failures into a handful of root causes, with adaptive alerts that close themselves."
      path="/products/pipelineiq"
    />
    <PipelineIQ />
    <ProductCTA
      product="pipelineiq"
      title={
        <>
          See PipelineIQ read <span className="text-gradient-orange">a platform like yours</span>
        </>
      }
      body="We'll walk you through the portal on a real estate, show how the client layer would map onto your stack, and spell out the read-only access it needs."
    />
  </PageLayout>
);

export default ProductPipelineIQ;
