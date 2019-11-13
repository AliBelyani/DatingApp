import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

import { AlertifyService } from '../../shared/alertify.service';
import { User } from '../../User/user.model';
import { UserService } from '../../User/user.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit {
  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private userService: UserService, private alertify: AlertifyService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) =>
        this.user = data.user,
      (error) => {
        this.alertify.error(error);
        this.router.navigate(['/member']);
      }
    );

    this.loadGallery();
  }

  loadGallery() {
    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];
    this.galleryImages = this.getImages();
  }

  getImages() {
    const imagesUrls = [];
    if (this.user.userPhoto !== undefined) {
      for (let i = 0; i < this.user.userPhoto.length; i++) {
        imagesUrls.push({
          small: this.user.userPhoto[i].url,
          medium: this.user.userPhoto[i].url,
          big: this.user.userPhoto[i].url,
          description: this.user.userPhoto[i].description,
        });
      }
    }
    return imagesUrls;
  }
}
