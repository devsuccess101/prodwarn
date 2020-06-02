import _get from 'lodash/get';
import { IMessage } from '@/types';

// eslint-disable-next-line import/prefer-default-export
export const whenCommand = (command: String, message: IMessage): Boolean => _get(message, 'command') === command;
