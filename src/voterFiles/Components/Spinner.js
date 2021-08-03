import Loader from "react-loader-spinner";
import React from 'react';

export default class Spinner extends React.Component {
  render() {
    return (
        <Loader type="TailSpin" color="#000" height={30} width={30} />
    );
  }
}