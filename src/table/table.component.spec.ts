/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TableComponent } from '../table/table.component';
import { SharedService } from 'src/app/shared.service';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let sharedService: SharedService;
  let activatedRoute: ActivatedRoute;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableComponent ],
      imports: [HttpClientTestingModule],
      providers: [SharedService , RouterOutlet , ActivatedRoute]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    sharedService = TestBed.inject(SharedService);
    fixture.detectChanges();
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call sources() and validate() methods on initialization', () => {
    spyOn(component, 'sources').and.callThrough();
    spyOn(component, 'validate').and.callThrough();
    component.ngOnInit();
    expect(component.sources).toHaveBeenCalled();
    expect(component.validate).toHaveBeenCalled();
  });
});
