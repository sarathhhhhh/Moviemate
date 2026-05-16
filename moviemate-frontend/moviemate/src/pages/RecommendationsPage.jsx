import PageContainer    from '../components/layout/PageContainer';
import AIRecommendView  from '../components/recommendations/AIRecommendView';
import { useRecommendations } from '../hooks/useRecommendations';

export default function RecommendationsPage() {
  const { recommendations, isLoading, error, refresh } = useRecommendations();

  return (
    <PageContainer
      title="For You"
      subtitle="AI-powered picks based on your taste"
    >
      <AIRecommendView
        recommendations={recommendations}
        isLoading={isLoading}
        error={error}
        onRefresh={refresh}
      />
    </PageContainer>
  );
}
