package com.hmsws.util;

import java.io.IOException;
import java.io.InputStream;
import java.io.StringWriter;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.util.Date;
import java.util.List;
import java.util.Properties;

import javax.activation.DataHandler;
import javax.activation.URLDataSource;
import javax.mail.Authenticator;
import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.servlet.http.HttpSession;

import org.apache.commons.io.IOUtils;



public class EmailUtil {

	/**
	 * If Id is not known the DB has the value "1" for Id
	 * 
	 * @param Id
	 * @param To
	 * @param Subject
	 * @param Message
	 * @param emailconfigmasterdao
	 * @return
	 */
//	public String sendMail(String Id, String To, String Subject,
//			String Message,
//			GenericDao<TblEmailconfigMaster> emailconfigmasterdao,
//			HttpSession session) {
//		/*
//		 * JSONArray jsonArray=new JSONArray(); JSONObject jsonObject=null;
//		 */
//		System.out.println("Id " + Id);
//		System.out.println("To " + To);
//		System.out.println("Subject " + Subject);
//		System.out.println("Message " + Message);
//		try {
//			
//			//done as on 29 jul 2016 add logic for businessid and countryid in hql query
//			String sesscountryid=(String) session.getAttribute("sesscountryid");
//			String sessbusinessid=(String)session.getAttribute("sessbusinessid");
////			String wherClause = "emailconfigId='" + Id
//			String wherClause = " tblCountryMaster.countryId='"+sesscountryid+"' and tblBusinessMaster.businessId='"+sessbusinessid+"' "
//					+ " AND emailconfigStatus='active' ";
//			List<TblEmailconfigMaster> retrieveWherClause = emailconfigmasterdao
//					.retrieveWherClause(new TblEmailconfigMaster(),
//							"TblEmailconfigMaster", wherClause);
//			if (retrieveWherClause.size() > 0) {
//				TblEmailconfigMaster tec = retrieveWherClause.get(0);
//				String host = tec.getEmailconfigOuthost();
//				String port = tec.getEmailconfigOutport();
//				String emailconfigEmailid = tec.getEmailconfigEmailid();
//				String emailconfigPass = tec.getEmailconfigPass();
//
//				String emailconfigClientName = tec.getEmailconfigClientName();
//
//				Session sessionmail = doEmailInit(host, port, emailconfigEmailid,
//						emailconfigPass);
//
//				generateAndSendEmail(sessionmail, To, Subject, Message,
//						emailconfigEmailid, emailconfigClientName);
//
//				return "true";
//			}
//
//		} catch (Exception e) {
//			System.out.println("EmailUtil.sendMail()");
//			e.printStackTrace();
//		}
//		return "false";
//	}
//
//	public String sendMailAttachment(String Id, String To, String Subject,
//			String Message,
//			GenericDao<TblEmailconfigMaster> emailconfigmasterdao,URL[] attachment,
//			HttpSession session) {
//		
//		/*
//		 * JSONArray jsonArray=new JSONArray(); JSONObject jsonObject=null;
//		 */
//		System.out.println("Id " + Id);
//		System.out.println("To " + To);
//		System.out.println("Subject " + Subject);
//		System.out.println("Message " + Message);
//		try {
//			//done as on 29 jul 2016 add logic for businessid and countryid in hql query
//			String sesscountryid=(String) session.getAttribute("sesscountryid");
//			String sessbusinessid=(String)session.getAttribute("sessbusinessid");
//
////			String wherClause = "emailconfigId='" + Id
//			String wherClause = "  tblCountryMaster.countryId='"+sesscountryid+"' and tblBusinessMaster.businessId='"+sessbusinessid+"' "
//					+ " AND emailconfigStatus='active'";
//			List<TblEmailconfigMaster> retrieveWherClause = emailconfigmasterdao
//					.retrieveWherClause(new TblEmailconfigMaster(),
//							"TblEmailconfigMaster", wherClause);
//			if (retrieveWherClause.size() > 0) {
//				TblEmailconfigMaster tec = retrieveWherClause.get(0);
//				String host = tec.getEmailconfigOuthost();
//				String port = tec.getEmailconfigOutport();
//				String emailconfigEmailid = tec.getEmailconfigEmailid();
//				String emailconfigPass = tec.getEmailconfigPass();
//
//				String emailconfigClientName = tec.getEmailconfigClientName();
//
//				Session sessionmail = doEmailInit(host, port, emailconfigEmailid,
//						emailconfigPass);
//
//				generateAndSendEmailWithAttachmentAndHtmlBody(sessionmail, To, Subject, Message,
//						emailconfigEmailid, emailconfigClientName,attachment);
//
//				return "true";
//			}
//
//		} catch (Exception e) {
//			System.out.println("EmailUtil.sendMail()");
//			e.printStackTrace();
//		}
//		return "false";
//	}
	/**
	 * TO Initialize the email comnfig
	 * 
	 * @param port
	 * @param host
	 * @return
	 */
	public Session doEmailInit(String host, String port,
			final String sourceEmail, final String password) {

		Properties props = new Properties();
		props.put("mail.smtp.host", host);// "smtp.gmail.com");
		props.put("mail.smtp.port", port);// "587");
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.starttls.enable", "true");

		System.out
				.println("NIFSE HERE\n2nd ===> create Authenticator object to pass in Session.getInstance argument..");

		Authenticator authentication = new Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(sourceEmail, password);
			}
		};
		Session session = Session.getInstance(props, authentication);

		return session;
	}

	public static void generateAndSendEmail(Session session, String toEmail,
			String subject, String body, String fromemail, String clientName) {
		try {
			System.out.println("MyApp.generateAndSendEmail()");
			System.out.println("\n3rd ===> generateAndSendEmail() starts..");

			MimeMessage crunchifyMessage = new MimeMessage(session);
			crunchifyMessage.addHeader("Content-type",
					"text/HTML; charset=UTF-8");
			crunchifyMessage.addHeader("format", "flowed");
			crunchifyMessage.addHeader("Content-Transfer-Encoding", "8bit");

			crunchifyMessage
					.setFrom(new InternetAddress(fromemail, clientName));
			crunchifyMessage
					.setReplyTo(InternetAddress.parse(fromemail, false));
			crunchifyMessage.setSubject(subject, "UTF-8");
			crunchifyMessage.setSentDate(new Date());
			crunchifyMessage.setRecipients(Message.RecipientType.TO,
					InternetAddress.parse(toEmail, false));

			// Create the message body part
			BodyPart messageBodyPart = new MimeBodyPart();
			messageBodyPart.setContent(body, "text/html");

			// Create a multipart message for attachment
			Multipart multipart = new MimeMultipart();

			// Set text message part
			multipart.addBodyPart(messageBodyPart);

			crunchifyMessage.setContent(multipart);

			System.out.println("\n5th ===> Finally Send message..");

			// Finally Send message
			Transport.send(crunchifyMessage);

			System.out
					.println("\n6th ===> Email Sent Successfully. Check your email now..");
			System.out.println("\n7th ===> generateAndSendEmail() ends..");

		} catch (MessagingException e) {
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
	}

	public static void generateAndSendEmailWithAttachment(Session session, String toEmail,
			String subject, String body, String fromemail, String clientName,URL[] attachment) {
		try {
			System.out.println("MyApp.generateAndSendEmail()");
			System.out.println("\n3rd ===> generateAndSendEmail() starts..");

			MimeMessage crunchifyMessage = new MimeMessage(session);
			crunchifyMessage.addHeader("Content-type",
					"text/HTML; charset=UTF-8");
			crunchifyMessage.addHeader("format", "flowed");
			crunchifyMessage.addHeader("Content-Transfer-Encoding", "8bit");

			crunchifyMessage
					.setFrom(new InternetAddress(fromemail, clientName));
			crunchifyMessage
					.setReplyTo(InternetAddress.parse(fromemail, false));
			crunchifyMessage.setSubject(subject, "UTF-8");
			crunchifyMessage.setSentDate(new Date());
			crunchifyMessage.setRecipients(Message.RecipientType.TO,
					InternetAddress.parse(toEmail, false));

			// Create the message body part
			BodyPart messageBodyPart = new MimeBodyPart();
			messageBodyPart.setContent(body, "text/html");

			
			Multipart multipart = new MimeMultipart();

			
			// Set text message part
			multipart.addBodyPart(messageBodyPart);

			
			// Create a multipart message for attachment
			
			for(int i=0;i<attachment.length;i++){
				MimeBodyPart messageBodyPart2 = new MimeBodyPart();
				URL f=attachment[i];
				String filename=f.getFile();
//				DataSource source=new FileDataSource(f);
				 
				URLDataSource source=new URLDataSource(f);
				messageBodyPart2.setDataHandler(new DataHandler(source));
				messageBodyPart2.setFileName(filename);
				multipart.addBodyPart(messageBodyPart2);
			}
						
			
			crunchifyMessage.setContent(multipart);

			System.out.println("\n5th ===> Finally Send message..");

			// Finally Send message
			Transport.send(crunchifyMessage);

			System.out
					.println("\n6th ===> Email Sent Successfully. Check your email now..");
			System.out.println("\n7th ===> generateAndSendEmail() ends..");

		} catch (MessagingException e) {
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
	}
	
	public static void generateAndSendEmailWithAttachmentAndHtmlBody(Session session, String toEmail,
			String subject, String body, String fromemail, String clientName,URL[] attachment) {
		try {
			System.out.println("MyApp.generateAndSendEmail()");
			System.out.println("\n3rd ===> generateAndSendEmail() starts..");

			MimeMessage crunchifyMessage = new MimeMessage(session);
			crunchifyMessage.addHeader("Content-type",
					"text/HTML; charset=UTF-8");
			crunchifyMessage.addHeader("format", "flowed");
			crunchifyMessage.addHeader("Content-Transfer-Encoding", "8bit");

			crunchifyMessage
					.setFrom(new InternetAddress(fromemail, clientName));
			crunchifyMessage
					.setReplyTo(InternetAddress.parse(fromemail, false));
			crunchifyMessage.setSubject(subject, "UTF-8");
			crunchifyMessage.setSentDate(new Date());
			crunchifyMessage.setRecipients(Message.RecipientType.TO,
					InternetAddress.parse(toEmail, false));

			// Create the message body part
			
			BodyPart messageBodyPart = new MimeBodyPart();
			
			//done as on 16 jun 2016 logic to send html file inside the email body
			StringWriter writer = new StringWriter();
			InputStream openStream = attachment[1].openStream();
			IOUtils.copy(openStream, writer);
			
			messageBodyPart.setContent(writer.toString(), "text/html; charset=utf-8");
			openStream.close();
			
//			messageBodyPart.setContent(body, "text/html");

			
			Multipart multipart = new MimeMultipart();

			
			// Set text message part
			multipart.addBodyPart(messageBodyPart);

			
			// Create a multipart message for attachment
			
//			for(int i=0;i<attachment.length;i++){
				MimeBodyPart messageBodyPart2 = new MimeBodyPart();
				URL f=attachment[0];
				String filename=f.getFile();
//				DataSource source=new FileDataSource(f);
				 
				URLDataSource source=new URLDataSource(f);
				messageBodyPart2.setDataHandler(new DataHandler(source));
				messageBodyPart2.setFileName(filename);
				multipart.addBodyPart(messageBodyPart2);
//			}
						
			
			crunchifyMessage.setContent(multipart);

			System.out.println("\n5th ===> Finally Send message..");

			// Finally Send message
			Transport.send(crunchifyMessage);

			System.out
					.println("\n6th ===> Email Sent Successfully. Check your email now..");
			System.out.println("\n7th ===> generateAndSendEmail() ends..");

		} catch (MessagingException e) {
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
