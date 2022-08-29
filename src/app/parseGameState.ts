import { GameState } from '../features/game/gameSlice';

export function ParseGameState(input: string) {
  const stringArray: string[] = input.toUpperCase().split('<BR>');
  // console.log(stringArray);
  const result: GameState = {
    gameID: 664,
    playerID: 3,
    authKey: '28df413b665604299807c461a7f3cae71c4176cb2b96afad04b84cf96d016258',
    playerOne: parseEQArray(stringArray[3]),
    playerTwo: {
      // AI or opposing player
      HeadEq: { cardNumber: 'CRU006' },
      ChestEq: { cardNumber: 'WTR005' },
      GlovesEq: { cardNumber: 'WTR153' },
      FeetEq: { cardNumber: 'WTR004' },
      WeaponLEq: { cardNumber: '' },
      Hero: { cardNumber: 'WTR002' },
      WeaponREq: { cardNumber: 'WTR003' },
      Health: 20,
      ActionPoints: 0,
      PitchRemaining: 0
    }
  };
  return result;
}

export function returnCard(input: string) {
  const cardArr: string[] = input.split(' ');
  return cardArr[0];
}

function parseEQArray(input: string) {
  let result;
  const eqArray: string[] = input.split('|');
  if (eqArray.length == 6) {
    return (result = {
      HeadEq: { cardNumber: returnCard(eqArray[2]) },
      ChestEq: { cardNumber: returnCard(eqArray[3]) },
      GlovesEq: { cardNumber: returnCard(eqArray[4]) },
      FeetEq: { cardNumber: returnCard(eqArray[5]) },
      WeaponLEq: { cardNumber: returnCard(eqArray[1]) },
      Hero: { cardNumber: returnCard(eqArray[0]) },
      WeaponREq: { cardNumber: '' },
      Health: 20,
      ActionPoints: 0,
      PitchRemaining: 0
    });
  } else {
    return (result = {
      HeadEq: { cardNumber: returnCard(eqArray[3]) },
      ChestEq: { cardNumber: returnCard(eqArray[4]) },
      GlovesEq: { cardNumber: returnCard(eqArray[5]) },
      FeetEq: { cardNumber: returnCard(eqArray[6]) },
      WeaponLEq: { cardNumber: returnCard(eqArray[1]) },
      Hero: { cardNumber: returnCard(eqArray[0]) },
      WeaponREq: { cardNumber: returnCard(eqArray[2]) },
      Health: 20,
      ActionPoints: 0,
      PitchRemaining: 0
    });
  }
}