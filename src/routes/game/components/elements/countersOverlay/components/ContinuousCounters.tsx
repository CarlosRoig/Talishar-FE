import classNames from 'classnames';
import styles from '../CountersOverlay.module.css';

type Props = {
  countersMap: { [key: string]: number };
};

const includedCounters = [
  'defence',
  'steam',
  'life',
  'attack',
  'energy',
  'haunt',
  'aim'
];

const toTooltipString = (type: string, value: number) =>
  `${value > 1 ? value : ''} ${type} counter${value > 1 ? 's' : ''}`;
export const ContinuousCounters = (props: Props) => {
  const { countersMap } = props;

  return (
    <>
      {!!Number(countersMap?.defence) && (
        <div
          className={styles.defCounter}
          title={`${countersMap?.defence} defence counter(s)`}
        >
          <div>{countersMap?.defence}</div>
        </div>
      )}
      {!!Number(countersMap?.steam) && (
        <div
          className={styles.steamCounter}
          title={`${countersMap?.steam} steam counter(s)`}
        >
          <div>{countersMap?.steam}</div>
        </div>
      )}
      {!!Number(countersMap?.attack) && (
        <div
          className={styles.attackCounter}
          title={`${countersMap?.attack} attack counter(s)`}
        >
          <div>{countersMap?.attack}</div>
        </div>
      )}
      {!!Number(countersMap?.life) && (
        <div
          className={styles.lifeCounter}
          title={`${countersMap?.life} life counter(s)`}
        >
          <div>{countersMap?.life}</div>
        </div>
      )}
      {!!Number(countersMap?.energy) && (
        <div
          className={styles.energyCounter}
          title={`${countersMap?.energy} energy counter(s)`}
        >
          <div>{countersMap?.energy}</div>
        </div>
      )}
        {!!Number(countersMap?.haunt) && (
        <div
          className={styles.hauntCounter}
          title={`${countersMap?.haunt} haunt counter(s)`}
        >
          <div>{countersMap?.haunt}</div>
        </div>
      )}
      {!!Number(countersMap?.aim) && (
        <div
          className={classNames(styles.aimCounter, styles.icon)} data-tooltip="Aim counter(s)"
          title={`aim counter`}
        />
      )}
    </>
  );
};
