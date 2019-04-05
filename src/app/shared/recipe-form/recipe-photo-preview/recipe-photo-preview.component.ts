import { environment } from './../../../../environments/environment';
import { UploadFile, FileSystemFileEntry } from 'ngx-file-drop';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-recipe-photo-preview',
	templateUrl: './recipe-photo-preview.component.html',
	styleUrls: ['./recipe-photo-preview.component.less']
})
export class RecipePhotoPreviewComponent implements OnInit {
	@Input() photo: UploadFile;
	@Input() photoId: string;
	@Output() deleteEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
	protected photoPreview: string | ArrayBuffer;
	protected photoUrl: string;

	constructor() { }

	ngOnInit() {
		if (this.photo) {
			this.readFile();
		} else {
			this.photoUrl = `${environment.apiUrl}recipesImages/${this.photoId}`;
		}
	}

	protected deleted() {
		this.deleteEmitter.emit(true);
	}

	private readFile() {
		const fileEntry = this.photo.fileEntry as FileSystemFileEntry;
		fileEntry.file((file: File) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				this.photoPreview = reader.result;
			};
		});
	}

}
