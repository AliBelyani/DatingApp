import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Photo } from '../../User/user.model';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../core/auth.service';
import { UserService } from '../../User/user.service';
import { Data } from '@angular/router';
import { AlertifyService } from '../../shared/alertify.service';

@Component({
  selector: 'app-member-photo',
  templateUrl: './member-photo.component.html',
  styleUrls: ['./member-photo.component.scss']
})
export class MemberPhotoComponent implements OnInit {
  @Input() photos: Photo[];
  @Output() memberPhotoChanged = new EventEmitter<string>();
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  currentMainPhoto: Photo;

  constructor(private authService: AuthService, private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.initUploader();
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'photo/' + this.authService.decodedToken.nameid,
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          registerDate: res.registerDate,
          description: res.description,
          isMain: res.isMain
        };
        this.photos.push(photo);
        if (photo.isMain) {
          this.authService.photoUrlSubject.next(photo.url);
          this.authService.currentUser.photoUrl = photo.url;
          localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
        }
      }
    };
  }

  setMainPhoto(photo: Photo) {
    this.userService.setMainPhoto(this.authService.decodedToken.nameid, photo.id).subscribe(
      (data: Data) => {
        this.alertify.success('Successfully Set To Main!');
        this.currentMainPhoto = this.photos.find(
          (p) => {
            return p.isMain === true;
          }
        );
        this.currentMainPhoto.isMain = false;
        photo.isMain = true;
        this.authService.photoUrlSubject.next(photo.url);
        this.authService.currentUser = JSON.parse(localStorage.getItem('user'));
        this.authService.currentUser.photoUrl = photo.url;
        localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
      },
      (error) => this.alertify.error(error)
    );
  }

  onDelete(id: number) {
    this.alertify.confirm('Are You Sure To Delete This Photo?', () => {
      this.userService.deletePhoto(id).subscribe(
        data => {
          this.photos.splice(this.photos.findIndex(i => i.id === id), 1);
          this.alertify.success('Delete Photo Successfully!!');
        },
        error => this.alertify.error(error)
      );
    });
  }
}
