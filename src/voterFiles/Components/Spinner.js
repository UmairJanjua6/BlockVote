import Loader from "react-loader-spinner";
import React from 'react';

export default class Spinner extends React.Component {
  render() {
    return (
        <Loader type="TailSpin" color="#f0b90b" height={20} width={20} />
    );
  }
}