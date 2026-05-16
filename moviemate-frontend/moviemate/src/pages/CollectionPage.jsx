import { useState, useCallback } from 'react';

import PageContainer from '../components/layout/PageContainer';
import Tabs          from '../components/layout/Tabs';
import MediaGrid     from '../components/media/MediaGrid';
import MediaFilters  from '../components/media/MediaFilters';
import MediaForm     from '../components/media/MediaForm';
import LoadingState  from '../components/media/LoadingState';
import EmptyState    from '../components/media/EmptyState';
import Modal         from '../components/common/Modal';
import Button        from '../components/common/Button';

import { useMedia }  from '../hooks/useMedia';
import { STATUS, STATUS_LABELS } from '../constants/mediaConstants';
import { countBy }   from '../utils/calculations';
import styles from './CollectionPage.module.css';

/** Build the status tabs with live counts */
function buildTabs(allItems) {
  return [
    { value: 'all',              label: 'All',       count: allItems.length },
    { value: STATUS.WATCHING,    label: 'Watching',  count: countBy(allItems, (i) => i.status === STATUS.WATCHING)   },
    { value: STATUS.COMPLETED,   label: 'Completed', count: countBy(allItems, (i) => i.status === STATUS.COMPLETED)  },
    { value: STATUS.WISHLIST,    label: 'Wishlist',  count: countBy(allItems, (i) => i.status === STATUS.WISHLIST)   },
    { value: STATUS.DROPPED,     label: 'Dropped',   count: countBy(allItems, (i) => i.status === STATUS.DROPPED)    },
  ];
}

export default function CollectionPage() {
  const {
    items, allItems,
    isLoading, error,
    filters, setFilter, resetFilters,
    saveMedia, removeMedia,
  } = useMedia();

  // Active tab is separate from the filter — it overrides the status filter
  const [activeTab,  setActiveTab]  = useState('all');
  const [isModalOpen, setModalOpen] = useState(false);
  const [editTarget,  setEditTarget] = useState(null);   // null = create mode
  const [isSaving,    setIsSaving]  = useState(false);
  const [saveError,   setSaveError] = useState(null);

  /* ── Tab switching syncs the status filter ── */
  function handleTabChange(tab) {
    setActiveTab(tab);
    setFilter('status', tab === 'all' ? '' : tab);
  }

  /* ── Open modal for create ── */
  function handleAdd() {
    setEditTarget(null);
    setSaveError(null);
    setModalOpen(true);
  }

  /* ── Open modal for edit ── */
  const handleEdit = useCallback((item) => {
    setEditTarget(item);
    setSaveError(null);
    setModalOpen(true);
  }, []);

  /* ── Delete with confirmation ── */
  const handleDelete = useCallback(async (id) => {
    if (!window.confirm('Remove this title from your collection?')) return;
    try {
      await removeMedia(id);
    } catch (err) {
      alert(`Could not delete: ${err.message}`);
    }
  }, [removeMedia]);

  /* ── Form submit (create or update) ── */
  async function handleSubmit(data) {
    setIsSaving(true);
    setSaveError(null);
    try {
      await saveMedia(data);
      setModalOpen(false);
    } catch (err) {
      setSaveError(err.message);
    } finally {
      setIsSaving(false);
    }
  }

  const tabs = buildTabs(allItems);

  return (
    <>
      <PageContainer
        title="My Collection"
        subtitle={`${allItems.length} title${allItems.length !== 1 ? 's' : ''} tracked`}
        actions={
          <Button onClick={handleAdd} icon={<span>＋</span>}>
            Add Title
          </Button>
        }
      >
        {/* Tabs */}
        <Tabs tabs={tabs} active={activeTab} onChange={handleTabChange} />

        {/* Filters */}
        <MediaFilters
          filters={filters}
          onChange={setFilter}
          onReset={() => { resetFilters(); setActiveTab('all'); }}
        />

        {/* Content */}
        {isLoading ? (
          <LoadingState />
        ) : error ? (
          <EmptyState
            title="Failed to load"
            message={error}
            action={<Button variant="secondary" onClick={() => window.location.reload()}>Retry</Button>}
          />
        ) : (
          <MediaGrid
            items={items}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </PageContainer>

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title={editTarget ? 'Edit Title' : 'Add to Collection'}
        size="lg"
      >
        {saveError && (
          <p className={styles.saveError}>⚠ {saveError}</p>
        )}
        <MediaForm
          initialData={editTarget}
          onSubmit={handleSubmit}
          onClose={() => setModalOpen(false)}
          isLoading={isSaving}
        />
      </Modal>
    </>
  );
}
