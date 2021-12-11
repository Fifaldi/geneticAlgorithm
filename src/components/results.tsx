import React from "react";
import { IValidCalcObject } from "../App";

export const Results = (props: {
  calculatinResults: { data: IValidCalcObject[]; sum: number }[];
  loading: boolean;
  showAll: boolean;
}) => {
  return (
    <div className="results">
      {props.loading ? (
        <h3>Loading ...</h3>
      ) : (
        <>
          <p>Liczba iteracji: {props.calculatinResults.length}</p>
          <div>
            <table>
              <thead>
                <tr>
                  <th>Wartość</th>
                  <th>Wartość binarna</th>
                  <th>Wartość procentowa</th>
                  <th>Wartość funkcji adaptacyjnej</th>
                </tr>
              </thead>

              {props.showAll ? (
                props.calculatinResults.map((el, i) => (
                  <tbody key={el.sum + " " + i}>
                    {el.data.map((ele, i) => (
                      <tr key={ele.value + " " + i}>
                        <td>{ele.value}</td>
                        <td>{ele.valueBinary}</td>
                        <td>{ele.percentageValue.toFixed(2)}%</td>
                        <td>{ele.adaptationFunctionValue}</td>
                      </tr>
                    ))}
                    <tr className="sum-row">
                      <td>Suma wartości funkcji adaptacyjnej: {el.sum}</td>
                    </tr>
                  </tbody>
                ))
              ) : (
                <tbody>
                  {props.calculatinResults[
                    props.calculatinResults.length - 1
                  ]?.data.map((ele, i) => (
                    <tr key={ele.value + " " + i}>
                      <td>{ele.value}</td>
                      <td>{ele.valueBinary}</td>
                      <td>{ele.percentageValue.toFixed(2)}%</td>
                      <td>{ele.adaptationFunctionValue}</td>
                    </tr>
                  ))}
                  <tr className="sum-row">
                    <td>
                      Suma wartości funkcji adaptacyjnej:{" "}
                      {
                        props.calculatinResults[
                          props.calculatinResults.length - 1
                        ]?.sum
                      }
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        </>
      )}
    </div>
  );
};
