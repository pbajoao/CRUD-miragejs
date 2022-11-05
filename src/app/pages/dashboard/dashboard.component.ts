import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { DashboardService } from './dashboard.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
    displayedColumns: string[] = ['id', 'name', 'nasc', 'cpf', 'acao'];
    dataSource: any;
    $usersSubscription: Subscription;
    isLoading = true;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private dashboardService: DashboardService,
        private router: Router,
        private dialog: MatDialog
    ) {
        this.dataSource = new MatTableDataSource([]);
    }

    ngOnInit() {
        this.onGetUsers();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    ngOnDestroy() {
        if (this.$usersSubscription) {
            this.$usersSubscription.unsubscribe();
        }
    }

    onGetUsers(): void {
        this.$usersSubscription = this.dashboardService.getUsers().subscribe(
            {
                next: (users: any) => {
                    this.isLoading = false;
                    this.dataSource = new MatTableDataSource(users);
                    this.dataSource.paginator = this.paginator;
                },
                error: (err) => console.error(err),
            }
        );
    }


    onEditUser(context: any): void {
        this.router.navigateByUrl('/add-or-update', { state: { user: context } })
    }

    onDeleteUsers(id: number): void {
        this.$usersSubscription = this.dashboardService.deleteUser(id).subscribe(
            {
                next: (users: any) => {
                    this.onGetUsers();
                },
                error: (err) => console.error(err),
            }
        );
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    openDialog(id: number): void {
        const dialogRef = this.dialog.open(DialogComponent, {
            width: '250px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.onDeleteUsers(id);
            }
        });
    }
    
}