import {getUnixTime} from 'date-fns';

const hour = 60 * 60;
export const updatingTime = hour;

export const curDateISO = getUnixTime(new Date());

export const updateTime = hour * 1000;
