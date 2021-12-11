import { useFormik } from "formik";
import React, { useState } from "react";
import { object } from "yup";
import "./App.css";
import { MainForm } from "./components/form";
import { Results } from "./components/results";
import {
  geneticAlgorithm,
  // getStartingPool,
} from "./functions/geneticAlgotithm";

export interface IAlgorithmData {
  factorA: number;
  factorB: number;
  factorC: number;
  factorD: number;
  Pk: number;
  Pm: number;
  chromoCount: number;
  rangeMin: number;
  rangeMax: number;
}

export interface IValidCalcObject {
  value: number;
  valueBinary: string;
  adaptationFunctionValue: number;
  percentageValue: number;
}

function App() {
  const [calculatinResults, setCalculatinResults] = useState<
    { data: IValidCalcObject[]; sum: number }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const handleSetCalculatinResults = (
    val: { data: IValidCalcObject[]; sum: number }[]
  ) => setCalculatinResults(val);
  const handleSetLoadingFalse = () => setLoading(false);
  const handleSetShowAll = (show: boolean) => setShowAll(show);

  const generateStaringPool = () => {
    const arr: number[] = [];
    for (let i = 0; i < 6; i++) {
      const randomNr = Math.floor(
        Math.random() * (formik.values.rangeMax - formik.values.rangeMin) +
          formik.values.rangeMin
      );
      arr.push(randomNr);
    }
    return arr;
  };

  const formik = useFormik<IAlgorithmData>({
    initialValues: {
      factorA: 0,
      factorB: 0,
      factorC: 0,
      factorD: 0,
      Pk: 0,
      Pm: 0,
      rangeMin: 0,
      rangeMax: 31,
      chromoCount: 6,
    },
    validationSchema: object().shape({}),
    onSubmit: (form) => {
      setLoading(true);
      geneticAlgorithm(
        generateStaringPool(),
        form,
        handleSetCalculatinResults,
        handleSetLoadingFalse
      );
    },
  });

  const handleChange = (name: string, value: number) => {
    formik.setFieldValue(name, value);
  };
  const handleSubmit = () => formik.handleSubmit();

  return (
    <main className="container">
      <header>
        <h1>Algorytm genetyczny</h1>
      </header>
      <div className="inner-container">
        <MainForm
          values={formik.values}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleSetShowAll={handleSetShowAll}
        />
        <Results
          calculatinResults={calculatinResults}
          loading={loading}
          showAll={showAll}
        />
      </div>
    </main>
  );
}

export default App;
