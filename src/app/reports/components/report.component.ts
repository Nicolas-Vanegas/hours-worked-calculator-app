import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { Report } from 'src/app/interfaces/report';
import { ReportService } from '../services/report.service';
import {
  NgxMatDateFormats,
  NGX_MAT_DATE_FORMATS,
} from '@angular-material-components/datetime-picker';

const INTL_DATE_INPUT_FORMAT = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hourCycle: 'h23',
  hour: '2-digit',
  minute: '2-digit',
};

const MAT_DATE_FORMATS: NgxMatDateFormats = {
  parse: {
    dateInput: INTL_DATE_INPUT_FORMAT,
  },
  display: {
    dateInput: INTL_DATE_INPUT_FORMAT,
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  },
};

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  providers: [{ provide: NGX_MAT_DATE_FORMATS, useValue: MAT_DATE_FORMATS }],
})
export class ReportComponent implements OnInit {
  minDate: number = 1;
  maxDate: number = 1;
  disabled: boolean = false;
  showSpinners: boolean = true;
  showSeconds: boolean = false;
  stepHour: number = 1;
  stepMinute: number = 1;
  stepSecond: number = 1;
  touchUi: boolean = false;
  enableMeridian: boolean = true;
  disableMinute: boolean = false;
  hideTime: boolean = false;
  color: ThemePalette = 'primary';
  startDateControl: FormControl;
  finishDateControl: FormControl;
  startDatePicker: any;
  finishDatePicker: any;
  reportForm: any;
  report: Report;

  constructor(private ReportService: ReportService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.report = {
      technicianId: '0',
      serviceId: '0',
      startDate: '0',
      finishDate: '0',
    };
    this.startDateControl = new FormControl(new Date(), [Validators.required]);
    this.finishDateControl = new FormControl(new Date(), [Validators.required]);
    this.reportForm = this.fb.group(
      {
        technicianId: ['', Validators.required],
        serviceId: ['', Validators.required],
        startDate: this.startDateControl,
        finishDate: this.finishDateControl,
      },
      { validator: this.validateStartDateIsLessThanFinishDate }
    );
  }

  onSubmit() {
    var reportFormValues = this.reportForm.value;
    this.report.technicianId = reportFormValues.technicianId;
    this.report.serviceId = reportFormValues.serviceId;
    this.report.startDate = reportFormValues.startDate;
    this.report.finishDate = reportFormValues.finishDate;
    this.ReportService.crearReporte(this.report).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (response) => {
        alert(response.error.error);
      },
    });
  }

  validateStartDateIsLessThanFinishDate(
    control: AbstractControl
  ): ValidationErrors | null {
    if (control && control.get('finishDate') && control.get('finishDate')) {
      const startDate = control.get('startDate')?.value;
      const finishDate = control.get('finishDate')?.value;
      return startDate.getTime() - startDate.getMilliseconds() >=
        finishDate.getTime() - finishDate.getMilliseconds()
        ? { dateError: true }
        : null;
    }
    return null;
  }
}
