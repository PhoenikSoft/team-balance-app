package com.phoenixoft.teambalanceapp.util;

import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@AllArgsConstructor
public class SendGridMailService {

    public static final String PASSWORD_RECOVERY = "Password recovery";
    public static final String EMAIL_FROM = "noreply@teambalance.app";
    private SendGrid sendGrid;

    public void sendMail(String mailContent, String receiverEmail) {
        Email from = new Email(EMAIL_FROM);
        Email to = new Email(receiverEmail);
        Content content = new Content("text/plain", mailContent);
        Mail mail = new Mail(from, PASSWORD_RECOVERY, to, content);

        Request request = new Request();
        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            Response response = this.sendGrid.api(request);
            sendGrid.api(request);
        } catch (IOException ex) {

        }
    }
}
