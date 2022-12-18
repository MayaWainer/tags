import { InputType } from '@nestjs/graphql'
import {SortInput} from "../../../../common/pagination/sort";
import {ConfigSortKey} from "../../../../common/enum/sort.enum";

@InputType()
export class ConfigSort extends SortInput(ConfigSortKey) {}
