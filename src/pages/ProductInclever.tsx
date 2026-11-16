import PageLayout from "@/components/PageLayout";
import SEOHead from "@/components/SEOHead";
import Inclever from "@/components/products/Inclever";
import { ProductCTA } from "@/components/products/ProductChrome";

const ProductInclever = () => (
  <PageLayout>
    <SEOHead
      title="Inclever — Governed AI Analytics & AI Readiness"
      description="Inclever answers plain-English data questions in Microsoft Teams only when your data has earned it, backed by an AI Readiness Control Tower that audits and certifies data for AI."
      path="/products/inclever"
    />
    <Inclever />
    <ProductCTA
      product="inclever"
      title={
        <>
          See your own data's <span className="text-gradient-orange">readiness score</span>
        </>
      }
      body="Start with an AI Readiness Assessment on one of your data assets. You'll get the certificate, issued or withheld, with every finding named. Or book a demo and watch questions travel through the three gates live."
    />
  </PageLayout>
);

export default ProductInclever;
