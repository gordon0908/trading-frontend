import React from 'react';
import { NASDAQ, NYSE } from '../../constants/symbs';

export const NyseOptions = symbol => NYSE.map(symb => <option key={symb} value={symb} >{symb}</option>);
export const NasdaqOptions = symbol => NASDAQ.map(symb => <option key={symb} value={symb}>{symb}</option>);