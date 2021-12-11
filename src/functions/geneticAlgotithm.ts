import { IAlgorithmData, IValidCalcObject } from "../App";

const convertToBinary = (num: number) => {
  let binary = num.toString(2);
  while (binary.length < 6) {
    binary = `0${binary}`;
  }
  return binary;
};
//PRZYGOTOWANIE DANYCH
const setValidPoolObject = (
  pool: number[],
  data: IAlgorithmData
): IValidCalcObject[] => {
  //WARTOŚCI FUNKCJI PRZYSTOSOWANIA:
  const adaptationFunctionValues = pool.map((el) => ({
    value: el,
    adaptationFunctionValue:
      data.factorA * (el ^ 3) +
      data.factorB * (el ^ 2) +
      data.factorC * el +
      data.factorD,
  }));

  // SUMA WARTOŚCI F. PRZYSTOSOWANIA:
  const sumAdaptationFunctionValues = adaptationFunctionValues.reduce(
    (previousValue, currentValue) => ({
      value: previousValue.value + currentValue.value,
      adaptationFunctionValue:
        previousValue.adaptationFunctionValue +
        currentValue.adaptationFunctionValue,
    })
  ).adaptationFunctionValue;

  return adaptationFunctionValues
    .map((el) => ({
      value: el.value,
      valueBinary: convertToBinary(el.value),
      adaptationFunctionValue: el.adaptationFunctionValue,
      percentageValue:
        (el.adaptationFunctionValue / sumAdaptationFunctionValues) * 100,
    }))
    .sort((a, b) => a.value - b.value);
};
//LOSOWANIE KOŁEM RULETKI
const wheelOfFortuneDraw = (data: IValidCalcObject[]) => {
  return data.map((el) => {
    const shot = Math.floor(Math.random() * 100);
    if (shot < data[0].percentageValue)
      return {
        value: data[0].value,
        binaryValue: convertToBinary(data[0].value),
      };
    else if (shot < data[0].percentageValue + data[1].percentageValue)
      return {
        value: data[1].value,
        binaryValue: convertToBinary(data[1].value),
      };
    else if (
      shot <
      data[0].percentageValue +
        data[1].percentageValue +
        data[2].percentageValue
    )
      return {
        value: data[2].value,
        binaryValue: convertToBinary(data[2].value),
      };
    else if (
      shot <
      data[0].percentageValue +
        data[1].percentageValue +
        data[2].percentageValue +
        data[3].percentageValue
    )
      return {
        value: data[3].value,
        binaryValue: convertToBinary(data[3].value),
      };
    else if (
      shot <
      data[0].percentageValue +
        data[1].percentageValue +
        data[2].percentageValue +
        data[3].percentageValue +
        data[4].percentageValue
    )
      return {
        value: data[4].value,
        binaryValue: convertToBinary(data[4].value),
      };
    else
      return {
        value: data[5].value,
        binaryValue: convertToBinary(data[5].value),
      };
  });
};

const chromoCrossing = (
  values: { value: number; binaryValue: string }[],
  data: IAlgorithmData
) => {
  const tmpArray = [
    [values[0], values[1]],
    [values[2], values[3]],
    [values[4], values[5]],
  ];

  return tmpArray.map((pair) => {
    const length = pair[0].binaryValue.length;
    const Pk = Math.random();
    const locus = Math.floor(Math.random() * (4 - 1) + 1);
    if (Pk < data.Pk) {
      return [
        pair[0].binaryValue.substring(0, locus) +
          pair[1].binaryValue.substring(locus, length),
        pair[1].binaryValue.substring(0, locus) +
          pair[0].binaryValue.substring(locus, length),
      ];
    } else {
      return [...pair.map((el) => el.binaryValue)];
    }
  });
};
const chromoMutation = (values: string[], data: IAlgorithmData) => {
  const length = values[0].length;

  return values.map((el) => {
    const Pm = Math.random();
    const locus = Math.floor(Math.random() * length);

    if (Pm <= data.Pm) {
      const po =
        el.substring(0, locus) +
        (el.charAt(locus) === "0" ? "1" : "0") +
        el.substring(locus + 1);
      return po;
    } else {
      return el;
    }
  });
};

export const ARRAY_OF_RESULTS: { data: IValidCalcObject[]; sum: number }[] = [];

export const geneticAlgorithm = (
  pool: number[],
  data: IAlgorithmData,
  func?: (val: { data: IValidCalcObject[]; sum: number }[]) => void,
  setLoadingFalse?: () => void
) => {
  if (
    (ARRAY_OF_RESULTS.length > 5 &&
      ARRAY_OF_RESULTS[ARRAY_OF_RESULTS.length - 1].sum ===
        ARRAY_OF_RESULTS[ARRAY_OF_RESULTS.length - 2].sum &&
      ARRAY_OF_RESULTS[ARRAY_OF_RESULTS.length - 1].sum ===
        ARRAY_OF_RESULTS[ARRAY_OF_RESULTS.length - 3].sum &&
      ARRAY_OF_RESULTS[ARRAY_OF_RESULTS.length - 1].sum ===
        ARRAY_OF_RESULTS[ARRAY_OF_RESULTS.length - 4].sum &&
      ARRAY_OF_RESULTS[ARRAY_OF_RESULTS.length - 1].sum ===
        ARRAY_OF_RESULTS[ARRAY_OF_RESULTS.length - 5].sum) ||
    ARRAY_OF_RESULTS.length === 6000
  ) {
    setLoadingFalse && setLoadingFalse();
    return;
  }

  const mainDataObject = setValidPoolObject(pool, data);

  ARRAY_OF_RESULTS.push({
    data: mainDataObject,
    sum: mainDataObject.reduce((a, b) => ({
      value: 0,
      percentageValue: 0,
      valueBinary: "",
      adaptationFunctionValue:
        a.adaptationFunctionValue + b.adaptationFunctionValue,
    })).adaptationFunctionValue,
  });
  func && func(ARRAY_OF_RESULTS);

  const valuesAfterRulette = wheelOfFortuneDraw(mainDataObject);

  //#5 KRZYŻOWANIE
  const chromosomesAfterCrossing = ([] as string[]).concat.apply(
    [],
    chromoCrossing(valuesAfterRulette, data)
  );

  //#6 MUTACJA
  const binaryChromosAfterMutation = chromoMutation(
    chromosomesAfterCrossing,
    data
  );
  const newFenotypeValues = binaryChromosAfterMutation.map((el) =>
    parseInt(el, 2)
  );
  geneticAlgorithm(newFenotypeValues, data, func, setLoadingFalse);
};


