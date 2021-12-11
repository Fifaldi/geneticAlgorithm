import React from "react";
import { IAlgorithmData } from "../App";

interface IMainForm {
  values: IAlgorithmData;
  handleSubmit(): void;
  handleChange(name: string, value: number): void;
  handleSetShowAll(show: boolean): void;
}

export const MainForm = (props: IMainForm) => {
  return (
    <form>
      <div className="function">
        <div>
          <input
            name="factorA"
            value={props.values.factorA}
            type="number"
            onChange={(e) =>
              props.handleChange("factorA", parseInt(e.target.value, 10))
            }
          />
          <label htmlFor="factorA"> x^3 + </label>
        </div>
        <div>
          <input
            name="factorB"
            value={props.values.factorB}
            type="number"
            onChange={(e) =>
              props.handleChange("factorB", parseInt(e.target.value, 10))
            }
          />
          <label htmlFor="factorB"> x^2 + </label>
        </div>

        <div>
          <input
            name="factorC"
            value={props.values.factorC}
            type="number"
            onChange={(e) =>
              props.handleChange("factorC", parseInt(e.target.value, 10))
            }
          />
          <label htmlFor="factorC"> x + </label>
        </div>

        <div>
          <input
            name="factorD"
            value={props.values.factorD}
            type="number"
            onChange={(e) =>
              props.handleChange("factorD", parseInt(e.target.value, 10))
            }
          />
          <label htmlFor="factorD"> </label>
        </div>
      </div>
      <div>
        <input
          name="Pk"
          value={props.values.Pk}
          type="number"
          min={0}
          step={0.1}
          max={1}
          onChange={(e) => props.handleChange("Pk", parseFloat(e.target.value))}
        />
        <label htmlFor="Pk"> Współczynnik krzyzowania</label>
      </div>
      <div>
        <input
          name="Pm"
          value={props.values.Pm}
          type="number"
          min={0}
          step={0.1}
          max={1}
          onChange={(e) => props.handleChange("Pm", parseFloat(e.target.value))}
        />
        <label htmlFor="Pk"> Współczynnik mutacji</label>
      </div>
      <div>Liczba chromosomów: {props.values.chromoCount}</div>
      <div>{`Zakres: <${props.values.rangeMin},${props.values.rangeMax}>`}</div>
      <div>
        <input
          type="checkbox"
          onChange={(e) => props.handleSetShowAll(e.target.checked)}
        />
        <span className="slider round">Pokaz wszystkie wyniki</span>
      </div>
      <button type="button" onClick={props.handleSubmit}>
        Oblicz
      </button>
    </form>
  );
};
