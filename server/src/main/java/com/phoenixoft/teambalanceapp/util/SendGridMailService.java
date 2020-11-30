package com.phoenixoft.teambalanceapp.util;

import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SendGridMailService {

    private static final String PASSWORD_RECOVERY = "Password recovery";
    private static final String EMAIL_FROM = "noreply@teambalance.cc";

    private final SendGrid sendGrid;

    @SneakyThrows
    public void sendMail(String mailContent, String receiverEmail) {
        var from = new Email(EMAIL_FROM);
        var to = new Email(receiverEmail);
        var content = new Content("text/plain", mailContent);
        var mail = new Mail(from, PASSWORD_RECOVERY, to, content);
        var request = new Request();
        request.setMethod(Method.POST);
        request.setEndpoint("mail/send");
        request.setBody(mail.build());
        this.sendGrid.api(request);
    }
}
