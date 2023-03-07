import React from 'react';
import { useAppSelector } from 'app/Hooks';
import { RootState } from 'app/Store';
import CardDisplay from '../../elements/cardDisplay/CardDisplay';
import styles from './ActiveLayersZone.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import ReorderLayers from './reorderLayers';

export default function ActiveLayersZone() {
  const activeLayer = useAppSelector(
    (state: RootState) => state.game.activeLayers
  );

  const staticCards = activeLayer?.cardList?.filter(
    (card) => card.reorderable === false
  );
  const reorderableCards = activeLayer?.cardList?.filter(
    (card) => card.reorderable
  );

  console.log('static Cards', staticCards);
  console.log('reorderable cards', reorderableCards);
  return (
    <AnimatePresence>
      {activeLayer?.active && (
        <motion.div
          className={styles.activeLayersBox}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          key="activeLayersBox"
        >
          <div className={styles.activeLayersTitleContainer}>
            <div className={styles.activeLayersTitle}>
              <h3 className={styles.title}>
                Active Layers
                {activeLayer.isReorderable
                  ? ' (Drag highlighted to reorder)'
                  : null}
              </h3>
              <p className={styles.orderingExplanation}>
                Priority settings can be adjusted in the menu
              </p>
              <p className={styles.orderingExplanation}>
                For more info about trigger ordering, see rule 1.10.2c of the
                comprehensive rulebook.
              </p>
            </div>
          </div>
          <div className={styles.activeLayersContents}>
            {staticCards &&
              staticCards.map((card, ix) => {
                return <CardDisplay card={card} key={ix} />;
              })}
            <ReorderLayers cards={reorderableCards ?? []} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
