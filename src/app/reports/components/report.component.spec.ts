import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReportComponent } from './report.component';
import { ReportService } from '../services/report.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('ReporteComponent', () => {
  let component: ReportComponent;
  let fixture: ComponentFixture<ReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
      providers: [ReportService],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(ReportComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Reporte de Servicios brindados'
    );
  });
});
