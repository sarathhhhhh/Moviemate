import PageContainer from '../components/layout/PageContainer';
import StatsView     from '../components/stats/StatsView';
import LoadingState  from '../components/media/LoadingState';
import EmptyState    from '../components/media/EmptyState';
import Button        from '../components/common/Button';
import { useStats }  from '../hooks/useStats';

export default function StatsPage() {
  const { stats, isLoading, error, refresh } = useStats();

  return (
    <PageContainer
      title="Watch Stats"
      subtitle="A breakdown of everything you've watched"
      actions={
        <Button variant="ghost" size="sm" onClick={refresh} icon={<span>🔄</span>}>
          Refresh
        </Button>
      }
    >
      {isLoading ? (
        <LoadingState count={6} />
      ) : error ? (
        <EmptyState
          title="Couldn't load stats"
          message={error}
          action={<Button variant="secondary" onClick={refresh}>Retry</Button>}
        />
      ) : !stats ? (
        <EmptyState
          title="No stats yet"
          message="Add some movies or shows to your collection first."
        />
      ) : (
        <StatsView stats={stats} />
      )}
    </PageContainer>
  );
}
