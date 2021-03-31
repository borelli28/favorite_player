import React, { useState } from 'react';
import { navigate } from "@reach/router";
import axios from 'axios';

export default props => {
  const { playerInfo } = props;
  const { playerStats } = props;

  console.log("Player Info");
  console.log(playerInfo);
  console.log("Player Stats");
  console.log(playerStats);

  return (
    ""
  )

}
