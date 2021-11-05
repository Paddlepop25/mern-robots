import React, { useState } from 'react';
import { TVSERIES } from './TvSeries.data';
const TestCheckBox = () => {
  // stackoverflow.com/questions/57667198/typescript-error-type-string-cant-be-used-to-index-type-x/57667278#57667278
  // !Typescript Indexable Type
  const tvSeriesIsChecked: { [key: string]: boolean } = {
    // !Typescript Utility Type
    // const tvSeriesIsChecked: Record<string, boolean> = {
    FullHouse: false,
    Moana: false,
    Superman: false,
    Wolfgang: false,
    'Zack & Cody': false,
    'Squid Game': false,
    Scream: false,
    '3rd Rock From the Sun': false,
    Batman: false,
    'Silicon Valley': false,
    Cars: false,
    Lucifer: false,
  };

  // Initial all unchecked boxes
  const [tvSeries, setTvSeries] = useState(tvSeriesIsChecked);

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const tvSeries = event.target.name;

    setTvSeries((prevState) => ({
      ...prevState,
      [tvSeries]: !prevState[tvSeries],
    }));
  };

  const onSelectAllCheckBoxes = (isSelected: boolean): void => {
    Object.keys(tvSeries).forEach((checkbox) => {
      setTvSeries((prevState) => ({
        ...prevState,
        [checkbox]: isSelected,
      }));
    });
  };

  const onCheckAllBoxes = () => {
    onSelectAllCheckBoxes(true);
  };

  const onUncheckAllBoxes = () => {
    onSelectAllCheckBoxes(false);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    let tvSeriesArray = [];
    // https://stackoverflow.com/questions/57667198/typescript-error-type-string-cant-be-used-to-index-type-x/57667278#57667278
    // !using Typescript Indexable types
    for (let key in tvSeries) {
      // !using Typescript Utility type
      //   // console.log(`${key}: ${tvSeriesIsChecked[key]}`);
      // for (const key of Object.keys(tvSeries)) {
      if (tvSeries[key] === true) {
        tvSeriesArray.push(key);
      }
    }

    console.log(tvSeriesArray);

    setTvSeries((prevState) => ({
      ...prevState,
      FullHouse: false,
      Moana: false,
      Superman: false,
      Wolfgang: false,
      'Zack & Cody': false,
      'Squid Game': false,
      Scream: false,
      '3rd Rock From the Sun': false,
      Batman: false,
      'Silicon Valley': false,
      Cars: false,
      Lucifer: false,
    }));
  };
  return (
    <div className='App'>
      <h2>Store Multiple Checkboxes Values in React</h2>
      <form onSubmit={onSubmit}>
        {TVSERIES.map((series, index) => {
          return (
            <div key={index}>
              <div className='form-check'>
                <label className='form-check-label'>
                  <input
                    type='checkbox'
                    checked={tvSeries[series]}
                    onChange={onChangeHandler}
                    className='form-check-input'
                    name={series}
                  />
                  {series}
                </label>
              </div>
            </div>
          );
        })}
        <div className='form-group'>
          <button
            className='btn btn-dark'
            type='button'
            onClick={onCheckAllBoxes}
          >
            Select All
          </button>
          <button
            className='btn btn-primary'
            type='button'
            onClick={onUncheckAllBoxes}
          >
            Deselect All
          </button>
          <button className='btn btn-success'>Save</button>
        </div>
      </form>
    </div>
  );
};

export default TestCheckBox;
