"use client";

import React, { useEffect, useState, useRef } from "react";

import { Dispatch } from "react";

import { ArtWorkDispatchAction } from "../../types";

import CreatableSelect from "react-select/creatable";

import { ArtWork, ReactSelectOption as Option } from "../../types";

import { customStyles } from "@/app/_utils/react-select-styles";

import sort from "@/app/_utils/sortReactSelectOptions";

const ProductTypesField = ({
  allArtWork,
  artWorkDispatch,
}: {
  allArtWork: ArtWork[];
  artWorkDispatch: Dispatch<ArtWorkDispatchAction>;
}) => {
  const [existingProductTypes, setExistingProductTypes] = useState<Option[]>(
    []
  );

  // set existing ProductTypes
  useEffect(() => {
    const tempProductTypesArr: Option[] = [];
    allArtWork.forEach((artWork) => {
      if (artWork.productTypes && artWork.productTypes.length > 0) {
        artWork.productTypes.forEach((featuredProductType) => {
          if (
            !tempProductTypesArr.some(
              (tempProductType) => tempProductType.value === featuredProductType
            )
          )
            tempProductTypesArr.push({
              value: featuredProductType,
              label: featuredProductType,
            });
        });
      }
    });

    sort(tempProductTypesArr);

    setExistingProductTypes([...tempProductTypesArr]);
  }, [allArtWork]);

  function handleChange(selectedOptions: Option[]) {
    console.log(selectedOptions);
    const productTypes = selectedOptions.map(
      (productType) => productType.value
    );
    artWorkDispatch({ type: "productTypes", payload: productTypes });
  }

  return (
    <label className="flex flex-col sm:flex-row items-center py-2">
      <span className="text-sm sm:text-base md:text-lg pb-2 sm:pb-0">
        Product Types:
      </span>
      <CreatableSelect
        id="productTypes"
        styles={customStyles}
        isMulti
        options={existingProductTypes}
        onChange={handleChange}
      />
    </label>
  );
};

export default ProductTypesField;
