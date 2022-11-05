import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import CustomValidate from 'src/app/utils/validators-context.utils';
import { AddOrUpdateService } from './add-or-update.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-add-or-update',
    templateUrl: './add-or-update.component.html',
    styleUrls: ['./add-or-update.component.scss']
})
export class AddOrUpdateComponent implements OnInit, OnDestroy {
    usuarioForm: FormGroup;
    $userSubscription: Subscription;
    user: any;

    constructor(
        private addOrUpdateService: AddOrUpdateService,
        private router: Router
        ) {
            const nav: any = this.router.getCurrentNavigation();
            this.user = nav.extras.state?.user;
            this.buildForm();
            this.onSetUser();
        }

    ngOnInit() {
        
    }

    ngOnDestroy() {
        if (this.$userSubscription) {
            this.$userSubscription.unsubscribe();
        }
    }

    save(): void {
        if (this.usuarioForm.valid) {
            if (!this.user) {
                this.onSave();
            } else {
                this.onEdit();
            }
            
        }
    }

    onSave(): void {
        this.$userSubscription = this.addOrUpdateService.addUser(this.usuarioForm.value).subscribe(
            {
                next: () => {
                    this.onPrev();
                },
                error: (err) => console.error(err),
            }
        );
    }

    onEdit(): void {
        this.$userSubscription = this.addOrUpdateService.updateUser(this.usuarioForm.value).subscribe(
            {
                next: () => {
                    this.onPrev();
                },
                error: (err) => console.error(err),
            }
        );
    }

    onPrev(): void {
        this.router.navigate(['/dashboard'], { queryParamsHandling: 'preserve'});
    }

    onSetUser(): void {
        if (this.user) {
            this.usuarioForm.patchValue(this.user);
        }
    }

    private buildForm(): void {
        this.usuarioForm = new FormGroup({
            id: new FormControl(),
            name: new FormControl('', { validators: [Validators.required] }),
            nasc: new FormControl('', { validators: [Validators.required, CustomValidate.dataNasc] }),
            cpf: new FormControl('', { validators: [Validators.required, CustomValidate.cpf] }),
        });
    }

    get name(): any { return this.usuarioForm.get('name'); };
    get nasc(): any { return this.usuarioForm.get('nasc'); };
    get cpf(): any { return this.usuarioForm.get('cpf'); };
}