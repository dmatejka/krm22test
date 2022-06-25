import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { ApiStatus } from 'src/app/core/models/ApiStatus';
import { CompOrientation, CompState } from 'src/app/core/models/CompState';
import { getDumb, User } from 'src/app/users/models/User';

@Component({
  selector: 'krm-user-tile',
  templateUrl: './user-tile.component.html',
  styleUrls: ['./user-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTileComponent {
    // enums for Templates
    public CompStateT = CompState;
    public ApiStatusT = ApiStatus;
    public CompOrientationT = CompOrientation;

  @Input() user: User = getDumb();

  // Component set-up defaults
  @Input() public cState: CompState = CompState.Read;
  @Input() public cStatus: ApiStatus = ApiStatus.Success;
  @Input() public cOrientation: CompOrientation = CompOrientation.Landscape;

  @Input() public hover: boolean = false;

  // #### Setting CLASSes for STATE, STATUS and ORIENTATION of the component
  @HostBinding('class.state-read') get stateRead() { return this.cState===CompState.Read; }
  // @HostBinding('class.state-add') get stateAdd() { return this.cState===CompState.Add; }
  // @HostBinding('class.state-update') get stateEdit() { return this.cState===CompState.Update; }

  // @HostBinding('class.selected') get stateSelected() { return this.isSelected; }

  @HostBinding('class.portrait') get orientPortrait() { return this.cOrientation === CompOrientation.Portrait; }
  @HostBinding('class.landscape') get orientLandscape() { return this.cOrientation === CompOrientation.Landscape; }

  @HostBinding('class.status-loading') get statusLoading() { return this.cStatus === ApiStatus.Loading; }
  // @HostBinding('class.status-saving') get statusSaving() { return this.cStatus === ApiStatus.saving; }
  @HostBinding('class.status-error') get statusError() { return this.cStatus === ApiStatus.Error; }
  @HostBinding('class.status-success') get statusSuccess() { return this.cStatus === ApiStatus.Success; }


  constructor() { }

}
