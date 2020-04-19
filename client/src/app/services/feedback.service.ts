import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {AddedFeedbackProjection, AddFeedbackProjection} from './dto/feedback.dto';

@Injectable({
    providedIn: 'root'
})
export class FeedbackService {

    private beEndpoint = `${environment.serverEndpoint}/api/feedbacks`;

    constructor(private http: HttpClient) {
    }

    addFeedback(feedback: AddFeedbackProjection) {
        return this.http.post<AddedFeedbackProjection>(this.beEndpoint, feedback);
    }
}
