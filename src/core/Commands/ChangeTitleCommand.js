import {Command} from '@core/Commands/Command';
import {CHANGE_TITLE} from '@/redux/types';

export class ChangeTitleCommand extends Command {
  type = CHANGE_TITLE
}
