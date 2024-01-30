package com.hmsws.rest;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.InputStream;
import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.data.JsonDataSource;
import net.sf.jasperreports.engine.query.JsonQueryExecuterFactory;

import org.json.JSONObject;

import com.hmsws.util.HibernateUtils;
import com.hmsws.util.QuickUtil;

@Path("/report")
public class ReportPrint {

	
	@POST
	@Path("WS_CosmeticBillDetailsReport")
	@Produces(MediaType.APPLICATION_JSON)
	public Response  WS_CosmeticBillDetailsReport(
			@FormParam("param_cosmeticbilldetailsid") String param_cosmeticbilldetailsid,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		
		Connection connection=null;
		System.out.println("param_cosmeticbilldetailsid : "+param_cosmeticbilldetailsid);
		
		try {              
					
			connection=HibernateUtils.currentSession().connection();
			
			HashMap params = new HashMap();
			
			
			params.put("param_cosmeticbilldetailsid", param_cosmeticbilldetailsid);			
			
			
			HttpSession session = request.getSession();
		 
			String ImageSavePath = QuickUtil.getImagePathForSaveWS(request, response,"reports");
			
			//String RIDASReportPath =AbstractController.getImagePathForSave(request, response, "reports");
			String reportPath = session.getServletContext().getRealPath("\\WEB-INF\\reports\\CosmeticBillDetailsReport.jasper");
			
			JasperPrint jasperPrint = JasperFillManager.fillReport(reportPath, params, connection);
			
			String filename="cosmeticbillreport_"+param_cosmeticbilldetailsid+".pdf";
			
			String reportSavePath=ImageSavePath+File.separator+filename; 
			System.out.println("filename "+filename);
			try {
				File filereport = new File(reportSavePath);
				if(filereport.exists())
				{
					filereport.delete();
				}
			} catch (Exception e) {
				
				e.printStackTrace();
			}
			JasperExportManager.exportReportToPdfFile(jasperPrint, reportSavePath);//(jasperPrint,servletOutputStream);
			
			String ImgPath = QuickUtil.getImagePathForWs(request, response,"reports");
			 
	        String result= ImgPath+""+filename;
	        String output="";
	        JSONObject jsonObject = new JSONObject();
	        jsonObject.put("FilePath", result);
	        output=jsonObject.toString();
	        System.out.println("Result="+output);
	        return Response.status(200).entity(output).build();
//	        		+ "//filename;
		}
		catch (Exception e) {
			
			e.printStackTrace();
		}
		finally
		{
			//done as on 17 mar 2016 to close database connection
			if(connection!=null){
				try {
					connection.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		return null;

	}
	
	@POST
	@Path("WS_OPDReceiptReport")
	@Produces(MediaType.APPLICATION_JSON)
	public Response  WS_OPDReceiptReport(
			@FormParam("receiptid") String receiptid,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		
		Connection connection=null;
		System.out.println("receiptid : "+receiptid);
		
		try {              
					
			connection=HibernateUtils.currentSession().connection();
			
			HashMap params = new HashMap();
			
			
			params.put("param_receiptid", receiptid);			
			
			
			HttpSession session = request.getSession();
		 
			String ImageSavePath = QuickUtil.getImagePathForSaveWS(request, response,"reports");
			
			//String RIDASReportPath =AbstractController.getImagePathForSave(request, response, "reports");
			String reportPath = session.getServletContext().getRealPath("\\WEB-INF\\reports\\OPDReceiptReport.jasper");
			
			JasperPrint jasperPrint = JasperFillManager.fillReport(reportPath, params, connection);
			
			String filename="opdreceiptreport_"+receiptid+".pdf";
			
			String reportSavePath=ImageSavePath+File.separator+filename; 
			System.out.println("filename "+filename);
			try {
				File filereport = new File(reportSavePath);
				if(filereport.exists())
				{
					filereport.delete();
				}
			} catch (Exception e) {
				
				e.printStackTrace();
			}
			JasperExportManager.exportReportToPdfFile(jasperPrint, reportSavePath);//(jasperPrint,servletOutputStream);
			
			String ImgPath = QuickUtil.getImagePathForWs(request, response,"reports");
			 
	        String result= ImgPath+""+filename;
	        String output="";
	        JSONObject jsonObject = new JSONObject();
	        jsonObject.put("FilePath", result);
	        output=jsonObject.toString();
	        System.out.println("Result="+output);
	        return Response.status(200).entity(output).build();
//	        		+ "//filename;
		}
		catch (Exception e) {
			
			e.printStackTrace();
		}
		finally
		{
			//done as on 17 mar 2016 to close database connection
			if(connection!=null){
				try {
					connection.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		return null;

	}
	
	@POST
	@Path("WS_OPDBillDetailsReport")
	@Produces(MediaType.APPLICATION_JSON)
	public Response  WS_OPDBillDetailsReport(
			@FormParam("param_opdbilldetailsid") String param_opdbilldetailsid,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		
		Connection connection=null;
		System.out.println("param_opdbilldetailsid : "+param_opdbilldetailsid);
		
		try {              
					
			connection=HibernateUtils.currentSession().connection();
			
			HashMap params = new HashMap();
			
			
			params.put("param_opdbilldetailsid", param_opdbilldetailsid);			
			
			
			HttpSession session = request.getSession();
		 
			String ImageSavePath = QuickUtil.getImagePathForSaveWS(request, response,"reports");
			
			//String RIDASReportPath =AbstractController.getImagePathForSave(request, response, "reports");
			String reportPath = session.getServletContext().getRealPath("\\WEB-INF\\reports\\OPDBillDetailsReport.jasper");
			
			JasperPrint jasperPrint = JasperFillManager.fillReport(reportPath, params, connection);
			
			String filename="opdreceiptreport_"+param_opdbilldetailsid+".pdf";
			
			String reportSavePath=ImageSavePath+File.separator+filename; 
			System.out.println("filename "+filename);
			try {
				File filereport = new File(reportSavePath);
				if(filereport.exists())
				{
					filereport.delete();
				}
			} catch (Exception e) {
				
				e.printStackTrace();
			}
			JasperExportManager.exportReportToPdfFile(jasperPrint, reportSavePath);//(jasperPrint,servletOutputStream);
			
			String ImgPath = QuickUtil.getImagePathForWs(request, response,"reports");
			 
	        String result= ImgPath+""+filename;
	        String output="";
	        JSONObject jsonObject = new JSONObject();
	        jsonObject.put("FilePath", result);
	        output=jsonObject.toString();
	        System.out.println("Result="+output);
	        return Response.status(200).entity(output).build();
//	        		+ "//filename;
		}
		catch (Exception e) {
			
			e.printStackTrace();
		}
		finally
		{
			//done as on 17 mar 2016 to close database connection
			if(connection!=null){
				try {
					connection.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		return null;

	}
	
	@POST
	@Path("WS_IPDReceiptReport")
	@Produces(MediaType.APPLICATION_JSON)
	public Response  WS_IPDReceiptReport(
			@FormParam("param_rcppayid") String param_rcppayid,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		
		Connection connection=null;
		System.out.println("param_rcppayid : "+param_rcppayid);
		
		try {              
					
			connection=HibernateUtils.currentSession().connection();
			
			HashMap params = new HashMap();
			
			
			params.put("param_rcppayid", param_rcppayid);			
			
			
			HttpSession session = request.getSession();
		 
			String ImageSavePath = QuickUtil.getImagePathForSaveWS(request, response,"reports");
			
			//String RIDASReportPath =AbstractController.getImagePathForSave(request, response, "reports");
			String reportPath = session.getServletContext().getRealPath("\\WEB-INF\\reports\\ipdreceiptreport.jasper");
			
			JasperPrint jasperPrint = JasperFillManager.fillReport(reportPath, params, connection);
			
			String filename="param_rcppayid_"+param_rcppayid+".pdf";
			
			String reportSavePath=ImageSavePath+File.separator+filename; 
			System.out.println("filename "+filename);
			try {
				File filereport = new File(reportSavePath);
				if(filereport.exists())
				{
					filereport.delete();
				}
			} catch (Exception e) {
				
				e.printStackTrace();
			}
			JasperExportManager.exportReportToPdfFile(jasperPrint, reportSavePath);//(jasperPrint,servletOutputStream);
			
			String ImgPath = QuickUtil.getImagePathForWs(request, response,"reports");
			 
	        String result= ImgPath+""+filename;
	        String output="";
	        JSONObject jsonObject = new JSONObject();
	        jsonObject.put("FilePath", result);
	        output=jsonObject.toString();
	        System.out.println("Result="+output);
	        return Response.status(200).entity(output).build();
//	        		+ "//filename;
		}
		catch (Exception e) {
			
			e.printStackTrace();
		}
		finally
		{
			//done as on 17 mar 2016 to close database connection
			if(connection!=null){
				try {
					connection.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		return null;

	}
	@POST
	@Path("WS_TheBillReport")
	@Produces(MediaType.APPLICATION_JSON)
	public Response  WS_TheBillReport(
			@FormParam("param_adminid") String param_adminid,
//			@FormParam("param_advancepaid") String param_advancepaid,		
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		
		Connection connection=null;
		System.out.println("param_rcppayid : "+param_adminid);
		
		try {              

			String ws_hsp_ipd_advancesum = Billing.local_hsp_ipd_advancesum(param_adminid);
			BigDecimal advancepaid=new BigDecimal(ws_hsp_ipd_advancesum);
			
			String local_procGetBillDate = Billing.local_procGetBillDate(param_adminid);
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
			
			Date dischargedate=simpleDateFormat.parse(local_procGetBillDate);
			
			connection=HibernateUtils.currentSession().connection();
			
			HashMap params = new HashMap();
			

			params.put("param_adminid", param_adminid);			
			params.put("param_advancepaid", advancepaid);			
			params.put("param_dischargedate", dischargedate);			
			
			
			HttpSession session = request.getSession();
		 
			String ImageSavePath = QuickUtil.getImagePathForSaveWS(request, response,"reports");
			
			//String RIDASReportPath =AbstractController.getImagePathForSave(request, response, "reports");
			String reportPath = session.getServletContext().getRealPath("\\WEB-INF\\reports\\thebillreport.jasper");
			
			JasperPrint jasperPrint = JasperFillManager.fillReport(reportPath, params, connection);
			
			String filename="adminid_"+param_adminid+".pdf";
			
			String reportSavePath=ImageSavePath+File.separator+filename; 
			System.out.println("filename "+filename);
			try {
				File filereport = new File(reportSavePath);
				if(filereport.exists())
				{
					filereport.delete();
				}
			} catch (Exception e) {
				
				e.printStackTrace();
			}
			JasperExportManager.exportReportToPdfFile(jasperPrint, reportSavePath);//(jasperPrint,servletOutputStream);
			
			String ImgPath = QuickUtil.getImagePathForWs(request, response,"reports");
			 
	        String result= ImgPath+""+filename;
	        String output="";
	        JSONObject jsonObject = new JSONObject();
	        jsonObject.put("FilePath", result);
	        output=jsonObject.toString();
	        System.out.println("Result="+output);
	        return Response.status(200).entity(output).build();
//	        		+ "//filename;
		}
		catch (Exception e) {
			
			e.printStackTrace();
		}
		finally
		{
			//done as on 17 mar 2016 to close database connection
			if(connection!=null){
				try {
					connection.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		return null;

	}
	
	@POST
	@Path("WS_IPDDetailedfinalreport")
	@Produces(MediaType.APPLICATION_JSON)
	public Response  WS_IPDDetailedfinalreport(
			@FormParam("param_adminid") String param_adminid,
//			@FormParam("param_advancepaid") String param_advancepaid,		
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		
		Connection connection=null;
		System.out.println("param_adminid : "+param_adminid);
		
		try {              

			String local_getprocGetConcession = Billing.local_getprocGetConcession(param_adminid);
			BigDecimal concession=new BigDecimal(local_getprocGetConcession);
			
			String local_getprocGetGrandTotal = Billing.local_getprocGetGrandTotal(param_adminid);
			BigDecimal grandtotal=new BigDecimal(local_getprocGetGrandTotal);
			
			String local_procGetSumAdvance = Billing.local_procGetSumAdvance(param_adminid);
			BigDecimal advance=new BigDecimal(local_procGetSumAdvance);
			
			
			connection=HibernateUtils.currentSession().connection();
			
			HashMap params = new HashMap();
			

			params.put("param_adminid", param_adminid);			
			params.put("param_concession",concession);			
			params.put("param_grandtotal", grandtotal);			
			params.put("param-advance",advance);			
			
			
			HttpSession session = request.getSession();
		 
			String ImageSavePath = QuickUtil.getImagePathForSaveWS(request, response,"reports");
			
			//String RIDASReportPath =AbstractController.getImagePathForSave(request, response, "reports");
			String reportPath = session.getServletContext().getRealPath("\\WEB-INF\\reports\\ipddetailedfinalreport.jasper");
			
			JasperPrint jasperPrint = JasperFillManager.fillReport(reportPath, params, connection);
			
			String filename="ipddetailedfinal_"+param_adminid+".pdf";
			
			String reportSavePath=ImageSavePath+File.separator+filename; 
			System.out.println("filename "+filename);
			try {
				File filereport = new File(reportSavePath);
				if(filereport.exists())
				{
					filereport.delete();
				}
			} catch (Exception e) {
				
				e.printStackTrace();
			}
			JasperExportManager.exportReportToPdfFile(jasperPrint, reportSavePath);//(jasperPrint,servletOutputStream);
			
			String ImgPath = QuickUtil.getImagePathForWs(request, response,"reports");
			 
	        String result= ImgPath+""+filename;
	        String output="";
	        JSONObject jsonObject = new JSONObject();
	        jsonObject.put("FilePath", result);
	        output=jsonObject.toString();
	        System.out.println("Result="+output);
	        return Response.status(200).entity(output).build();
//	        		+ "//filename;
		}
		catch (Exception e) {
			
			e.printStackTrace();
		}
		finally
		{
			//done as on 17 mar 2016 to close database connection
			if(connection!=null){
				try {
					connection.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		return null;

	}
	
	@POST
	@Path("WS_IPDDischargeReport")
	@Produces(MediaType.APPLICATION_JSON)
	public Response  WS_IPDDischargeReport(
			@FormParam("param_adminid") String param_adminid,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		
		Connection connection=null;
		System.out.println("param_adminid : "+param_adminid);
		
		try {              
					
			connection=HibernateUtils.currentSession().connection();
			
			HashMap params = new HashMap();
			
			
			params.put("param_adminid", param_adminid);			
			
			
			HttpSession session = request.getSession();
		 
			String ImageSavePath = QuickUtil.getImagePathForSaveWS(request, response,"reports");
			
			//String RIDASReportPath =AbstractController.getImagePathForSave(request, response, "reports");
			String reportPath = session.getServletContext().getRealPath("\\WEB-INF\\reports\\hspipddischargedetailsreport.jasper");
			
			JasperPrint jasperPrint = JasperFillManager.fillReport(reportPath, params, connection);
			
			String filename="dischargereport_"+param_adminid+".pdf";
			
			String reportSavePath=ImageSavePath+File.separator+filename; 
			System.out.println("filename "+filename);
			try {
				File filereport = new File(reportSavePath);
				if(filereport.exists())
				{
					filereport.delete();
				}
			} catch (Exception e) {
				
				e.printStackTrace();
			}
			JasperExportManager.exportReportToPdfFile(jasperPrint, reportSavePath);//(jasperPrint,servletOutputStream);
			
			String ImgPath = QuickUtil.getImagePathForWs(request, response,"reports");
			 
	        String result= ImgPath+""+filename;
	        String output="";
	        JSONObject jsonObject = new JSONObject();
	        jsonObject.put("FilePath", result);
	        output=jsonObject.toString();
	        System.out.println("Result="+output);
	        return Response.status(200).entity(output).build();
//	        		+ "//filename;
		}
		catch (Exception e) {
			
			e.printStackTrace();
		}
		finally
		{
			//done as on 17 mar 2016 to close database connection
			if(connection!=null){
				try {
					connection.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		return null;

	}
	
	@POST
	@Path("WS_IPDReceiptCancelReport")
	@Produces(MediaType.APPLICATION_JSON)
	public Response  WS_IPDReceiptCancelReport(
			@FormParam("param_fromdate") String param_fromdate,
			@FormParam("param_todate") String param_todate,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		
		Connection connection=null;
		System.out.println("param_fromdate : "+param_fromdate);
		
		try {              
					
			connection=HibernateUtils.currentSession().connection();
			
			HashMap params = new HashMap();
			
			
			params.put("param_fromdate", param_fromdate);			
			params.put("param_todate", param_todate);			
			
			
			HttpSession session = request.getSession();
		 
			String ImageSavePath = QuickUtil.getImagePathForSaveWS(request, response,"reports");
			
			//String RIDASReportPath =AbstractController.getImagePathForSave(request, response, "reports");
			String reportPath = session.getServletContext().getRealPath("\\WEB-INF\\reports\\IPDReceiptCancelReport.jasper");
			
			JasperPrint jasperPrint = JasperFillManager.fillReport(reportPath, params, connection);
			
			String filename="ipdreceiptcancel_"+new Date().getTime()+".pdf";
			
			String reportSavePath=ImageSavePath+File.separator+filename; 
			System.out.println("filename "+filename);
			try {
				File filereport = new File(reportSavePath);
				if(filereport.exists())
				{
					filereport.delete();
				}
			} catch (Exception e) {
				
				e.printStackTrace();
			}
			JasperExportManager.exportReportToPdfFile(jasperPrint, reportSavePath);//(jasperPrint,servletOutputStream);
			
			String ImgPath = QuickUtil.getImagePathForWs(request, response,"reports");
			 
	        String result= ImgPath+""+filename;
	        String output="";
	        JSONObject jsonObject = new JSONObject();
	        jsonObject.put("FilePath", result);
	        output=jsonObject.toString();
	        System.out.println("Result="+output);
	        return Response.status(200).entity(output).build();
//	        		+ "//filename;
		}
		catch (Exception e) {
			
			e.printStackTrace();
		}
		finally
		{
			//done as on 17 mar 2016 to close database connection
			if(connection!=null){
				try {
					connection.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		return null;

	}
	@POST
	@Path("WS_OPDReceiptCancelReport")
	@Produces(MediaType.APPLICATION_JSON)
	public Response  WS_OPDReceiptCancelReport(
			@FormParam("param_hospitalid") String param_hospitalid,
			@FormParam("param_fromdate") String param_fromdate,
			@FormParam("param_todate") String param_todate,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		
		Connection connection=null;
		System.out.println("param_hospitalid : "+param_fromdate);
		
		try {              
					
			connection=HibernateUtils.currentSession().connection();
			
			HashMap params = new HashMap();
			
			
			params.put("param_fromdate", param_fromdate);			
			params.put("param_todate", param_todate);			
			params.put("param_hospitalid", param_hospitalid);			
			
			
			HttpSession session = request.getSession();
		 
			String ImageSavePath = QuickUtil.getImagePathForSaveWS(request, response,"reports");
			
			//String RIDASReportPath =AbstractController.getImagePathForSave(request, response, "reports");
			String reportPath = session.getServletContext().getRealPath("\\WEB-INF\\reports\\OPDReceiptCancelReport.jasper");
			
			JasperPrint jasperPrint = JasperFillManager.fillReport(reportPath, params, connection);
			
			String filename="opdreceiptcancel_"+new Date().getTime()+".pdf";
			
			String reportSavePath=ImageSavePath+File.separator+filename; 
			System.out.println("filename "+filename);
			try {
				File filereport = new File(reportSavePath);
				if(filereport.exists())
				{
					filereport.delete();
				}
			} catch (Exception e) {
				
				e.printStackTrace();
			}
			JasperExportManager.exportReportToPdfFile(jasperPrint, reportSavePath);//(jasperPrint,servletOutputStream);
			
			String ImgPath = QuickUtil.getImagePathForWs(request, response,"reports");
			 
	        String result= ImgPath+""+filename;
	        String output="";
	        JSONObject jsonObject = new JSONObject();
	        jsonObject.put("FilePath", result);
	        output=jsonObject.toString();
	        System.out.println("Result="+output);
	        return Response.status(200).entity(output).build();
//	        		+ "//filename;
		}
		catch (Exception e) {
			
			e.printStackTrace();
		}
		finally
		{
			//done as on 17 mar 2016 to close database connection
			if(connection!=null){
				try {
					connection.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		return null;

	}
	
	@POST
	@Path("WS_OPDBillCancelReport")
	@Produces(MediaType.APPLICATION_JSON)
	public Response  WS_OPDBillCancelReport(
			@FormParam("param_hospitalid") String param_hospitalid,
			@FormParam("param_fromdate") String param_fromdate,
			@FormParam("param_todate") String param_todate,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		
		Connection connection=null;
		System.out.println("param_hospitalid : "+param_fromdate);
		
		try {              
					
			connection=HibernateUtils.currentSession().connection();
			
			HashMap params = new HashMap();
			
			
			params.put("param_fromdate", param_fromdate);			
			params.put("param_todate", param_todate);			
			params.put("param_hospitalid", param_hospitalid);			
			
			
			HttpSession session = request.getSession();
		 
			String ImageSavePath = QuickUtil.getImagePathForSaveWS(request, response,"reports");
			
			//String RIDASReportPath =AbstractController.getImagePathForSave(request, response, "reports");
			String reportPath = session.getServletContext().getRealPath("\\WEB-INF\\reports\\OPDBillCancelReport.jasper");
			
			JasperPrint jasperPrint = JasperFillManager.fillReport(reportPath, params, connection);
			
			String filename="opdreceiptcancel_"+new Date().getTime()+".pdf";
			
			String reportSavePath=ImageSavePath+File.separator+filename; 
			System.out.println("filename "+filename);
			try {
				File filereport = new File(reportSavePath);
				if(filereport.exists())
				{
					filereport.delete();
				}
			} catch (Exception e) {
				
				e.printStackTrace();
			}
			JasperExportManager.exportReportToPdfFile(jasperPrint, reportSavePath);//(jasperPrint,servletOutputStream);
			
			String ImgPath = QuickUtil.getImagePathForWs(request, response,"reports");
			 
	        String result= ImgPath+""+filename;
	        String output="";
	        JSONObject jsonObject = new JSONObject();
	        jsonObject.put("FilePath", result);
	        output=jsonObject.toString();
	        System.out.println("Result="+output);
	        return Response.status(200).entity(output).build();
//	        		+ "//filename;
		}
		catch (Exception e) {
			
			e.printStackTrace();
		}
		finally
		{
			//done as on 17 mar 2016 to close database connection
			if(connection!=null){
				try {
					connection.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		return null;

	}
	
	@POST
	@Path("WS_OPDBillsortbyparticularsReport")
	@Produces(MediaType.APPLICATION_JSON)
	public Response  WS_OPDBillsortbyparticularsReport(
			@FormParam("param_hospitalid") String param_hospitalid,
			@FormParam("param_fromdate") String param_fromdate,
			@FormParam("param_todate") String param_todate,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		
		Connection connection=null;
		System.out.println("param_hospitalid : "+param_fromdate);
		
		try {              
					
			connection=HibernateUtils.currentSession().connection();
			
			HashMap params = new HashMap();
			
			
			params.put("param_fromdate", param_fromdate);			
			params.put("param_todate", param_todate);			
			params.put("param_hospitalid", param_hospitalid);			
			
			
			HttpSession session = request.getSession();
		 
			String ImageSavePath = QuickUtil.getImagePathForSaveWS(request, response,"reports");
			
			//String RIDASReportPath =AbstractController.getImagePathForSave(request, response, "reports");
			String reportPath = session.getServletContext().getRealPath("\\WEB-INF\\reports\\OPDBillsortbyparticularsReport.jasper");
			
			JasperPrint jasperPrint = JasperFillManager.fillReport(reportPath, params, connection);
			
			String filename="OPDBillsortbyparticularsReport_"+new Date().getTime()+".pdf";
			
			String reportSavePath=ImageSavePath+File.separator+filename; 
			System.out.println("filename "+filename);
			try {
				File filereport = new File(reportSavePath);
				if(filereport.exists())
				{
					filereport.delete();
				}
			} catch (Exception e) {
				
				e.printStackTrace();
			}
			JasperExportManager.exportReportToPdfFile(jasperPrint, reportSavePath);//(jasperPrint,servletOutputStream);
			
			String ImgPath = QuickUtil.getImagePathForWs(request, response,"reports");
			 
	        String result= ImgPath+""+filename;
	        String output="";
	        JSONObject jsonObject = new JSONObject();
	        jsonObject.put("FilePath", result);
	        output=jsonObject.toString();
	        System.out.println("Result="+output);
	        return Response.status(200).entity(output).build();
//	        		+ "//filename;
		}
		catch (Exception e) {
			
			e.printStackTrace();
		}
		finally
		{
			//done as on 17 mar 2016 to close database connection
			if(connection!=null){
				try {
					connection.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		return null;

	}
	
	@POST
	@Path("IPDPaymentdischargereport")
	@Produces(MediaType.APPLICATION_JSON)
	public Response  WS_IPDPaymentdischargereport(
			@FormParam("param_hospitalid") String param_hospitalid,
			@FormParam("param_fromdate") String param_fromdate,
			@FormParam("param_todate") String param_todate,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		
		Connection connection=null;
		System.out.println("ReportPrint.WS_IPDPaymentdischargereport()");
		System.out.println("param_hospitalid : "+param_fromdate);
		
		try {              
					
			connection=HibernateUtils.currentSession().connection();
			
			HashMap params = new HashMap();
			
			
			params.put("param_fromdate", param_fromdate);			
			params.put("param_todate", param_todate);			
			params.put("param_hospitalid", param_hospitalid);			
			
			
			HttpSession session = request.getSession();
		 
			String ImageSavePath = QuickUtil.getImagePathForSaveWS(request, response,"reports");
			
			//String RIDASReportPath =AbstractController.getImagePathForSave(request, response, "reports");
			String reportPath = session.getServletContext().getRealPath("\\WEB-INF\\reports\\IPDPaymentdischargereport.jasper");
			
			JasperPrint jasperPrint = JasperFillManager.fillReport(reportPath, params, connection);
			
			String filename="IPDPaymentdischargereport_"+new Date().getTime()+".pdf";
			
			String reportSavePath=ImageSavePath+File.separator+filename; 
			System.out.println("filename "+filename);
			try {
				File filereport = new File(reportSavePath);
				if(filereport.exists())
				{
					filereport.delete();
				}
			} catch (Exception e) {
				
				e.printStackTrace();
			}
			JasperExportManager.exportReportToPdfFile(jasperPrint, reportSavePath);//(jasperPrint,servletOutputStream);
			
			String ImgPath = QuickUtil.getImagePathForWs(request, response,"reports");
			 
	        String result= ImgPath+""+filename;
	        String output="";
	        JSONObject jsonObject = new JSONObject();
	        jsonObject.put("FilePath", result);
	        output=jsonObject.toString();
	        System.out.println("Result="+output);
	        return Response.status(200).entity(output).build();
//	        		+ "//filename;
		}
		catch (Exception e) {
			
			e.printStackTrace();
		}
		finally
		{
			//done as on 17 mar 2016 to close database connection
			if(connection!=null){
				try {
					connection.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		return null;

	}
	
	@POST
	@Path("WS_IPDDoctorChargesReport")
	@Produces(MediaType.APPLICATION_JSON)
	public Response  WS_IPDDoctorChargesReport(
			@FormParam("param_hospitalid") String param_hospitalid,
			@FormParam("param_fromdate") String param_fromdate,
			@FormParam("param_todate") String param_todate,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		
		Connection connection=null;
		System.out.println(param_hospitalid+" : "+param_fromdate);
		
		try {              
					
			connection=HibernateUtils.currentSession().connection();
			
			HashMap params = new HashMap();
			
			
			params.put("param_fromdate", param_fromdate);			
			params.put("param_todate", param_todate);			
			params.put("param_hospitalid", param_hospitalid);			
			
			
			HttpSession session = request.getSession();
		 
			String ImageSavePath = QuickUtil.getImagePathForSaveWS(request, response,"reports");
			
			//String RIDASReportPath =AbstractController.getImagePathForSave(request, response, "reports");
			String reportPath = session.getServletContext().getRealPath("\\WEB-INF\\reports\\IPDDoctorChargesReport.jasper");
			
			JasperPrint jasperPrint = JasperFillManager.fillReport(reportPath, params, connection);
			
			String filename="IPDDoctorChargesReport_"+new Date().getTime()+".pdf";
			
			String reportSavePath=ImageSavePath+File.separator+filename; 
			System.out.println("filename "+filename);
			try {
				File filereport = new File(reportSavePath);
				if(filereport.exists())
				{
					filereport.delete();
				}
			} catch (Exception e) {
				
				e.printStackTrace();
			}
			JasperExportManager.exportReportToPdfFile(jasperPrint, reportSavePath);//(jasperPrint,servletOutputStream);
			
			String ImgPath = QuickUtil.getImagePathForWs(request, response,"reports");
			 
	        String result= ImgPath+""+filename;
	        String output="";
	        JSONObject jsonObject = new JSONObject();
	        jsonObject.put("FilePath", result);
	        output=jsonObject.toString();
	        System.out.println("Result="+output);
	        return Response.status(200).entity(output).build();
//	        		+ "//filename;
		}
		catch (Exception e) {
			
			e.printStackTrace();
		}
		finally
		{
			//done as on 17 mar 2016 to close database connection
			if(connection!=null){
				try {
					connection.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		return null;

	}
	
	@POST
	@Path("WS_IPDDoctorChargesDetailsReport")
	@Produces(MediaType.APPLICATION_JSON)
	public Response  WS_IPDDoctorChargesDetailsReport(
			@FormParam("param_hospitalid") String param_hospitalid,
			@FormParam("param_doctorid") String param_doctorid,
			@FormParam("param_fromdate") String param_fromdate,
			@FormParam("param_todate") String param_todate,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		
		Connection connection=null;
		System.out.println(param_hospitalid+" : "+param_fromdate);
		
		try {              
					
			connection=HibernateUtils.currentSession().connection();
			
			HashMap params = new HashMap();
			
			
			params.put("param_fromdate", param_fromdate);			
			params.put("param_todate", param_todate);			
			params.put("param_hospitalid", param_hospitalid);			
			params.put("param_doctorid", param_doctorid);			
			
			
			HttpSession session = request.getSession();
		 
			String ImageSavePath = QuickUtil.getImagePathForSaveWS(request, response,"reports");
			
			//String RIDASReportPath =AbstractController.getImagePathForSave(request, response, "reports");
			String reportPath = session.getServletContext().getRealPath("\\WEB-INF\\reports\\IPDDoctorChargesDetailsReport.jasper");
			
			JasperPrint jasperPrint = JasperFillManager.fillReport(reportPath, params, connection);
			
			String filename="IPDDoctorChargesDetailsReport_"+new Date().getTime()+".pdf";
			
			String reportSavePath=ImageSavePath+File.separator+filename; 
			System.out.println("filename "+filename);
			try {
				File filereport = new File(reportSavePath);
				if(filereport.exists())
				{
					filereport.delete();
				}
			} catch (Exception e) {
				
				e.printStackTrace();
			}
			JasperExportManager.exportReportToPdfFile(jasperPrint, reportSavePath);//(jasperPrint,servletOutputStream);
			
			String ImgPath = QuickUtil.getImagePathForWs(request, response,"reports");
			 
	        String result= ImgPath+""+filename;
	        String output="";
	        JSONObject jsonObject = new JSONObject();
	        jsonObject.put("FilePath", result);
	        output=jsonObject.toString();
	        System.out.println("Result="+output);
	        return Response.status(200).entity(output).build();
//	        		+ "//filename;
		}
		catch (Exception e) {
			
			e.printStackTrace();
		}
		finally
		{
			//done as on 17 mar 2016 to close database connection
			if(connection!=null){
				try {
					connection.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		return null;

	}
	
	@POST
	@Path("WS_OPDBillsortbyparticularsDetailReport")
	@Produces(MediaType.APPLICATION_JSON)
	public Response  WS_OPDBillsortbyparticularsDetailReport(
			@FormParam("param_hospitalid") String param_hospitalid,
			@FormParam("param_fromdate") String param_fromdate,
			@FormParam("param_todate") String param_todate,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		
		Connection connection=null;
		System.out.println("param_hospitalid : "+param_fromdate);
		
		try {              
					
			connection=HibernateUtils.currentSession().connection();
			
			HashMap params = new HashMap();
			
			
			params.put("param_fromdate", param_fromdate);			
			params.put("param_todate", param_todate);			
			params.put("param_hospitalid", param_hospitalid);			
			
			
			HttpSession session = request.getSession();
		 
			String ImageSavePath = QuickUtil.getImagePathForSaveWS(request, response,"reports");
			
			//String RIDASReportPath =AbstractController.getImagePathForSave(request, response, "reports");
			String reportPath = session.getServletContext().getRealPath("\\WEB-INF\\reports\\OPDBillsortbyparticularsDetailsReport.jasper");
			
			JasperPrint jasperPrint = JasperFillManager.fillReport(reportPath, params, connection);
			
			String filename="OPDBillsortbyparticularsDetailsReport_"+new Date().getTime()+".pdf";
			
			String reportSavePath=ImageSavePath+File.separator+filename; 
			System.out.println("filename "+filename);
			try {
				File filereport = new File(reportSavePath);
				if(filereport.exists())
				{
					filereport.delete();
				}
			} catch (Exception e) {
				
				e.printStackTrace();
			}
			JasperExportManager.exportReportToPdfFile(jasperPrint, reportSavePath);//(jasperPrint,servletOutputStream);
			
			String ImgPath = QuickUtil.getImagePathForWs(request, response,"reports");
			 
	        String result= ImgPath+""+filename;
	        String output="";
	        JSONObject jsonObject = new JSONObject();
	        jsonObject.put("FilePath", result);
	        output=jsonObject.toString();
	        System.out.println("Result="+output);
	        return Response.status(200).entity(output).build();
//	        		+ "//filename;
		}
		catch (Exception e) {
			
			e.printStackTrace();
		}
		finally
		{
			//done as on 17 mar 2016 to close database connection
			if(connection!=null){
				try {
					connection.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		return null;

	}
	
	@POST
	@Path("WS_opdprescriptionreport")
	@Produces(MediaType.APPLICATION_JSON)
	public Response  WS_OPDPrescriptionreport(
			@FormParam("param_opddocpid") String param_opddocpid,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		
		Connection connection=null;
		System.out.println("param_opddocpid : "+param_opddocpid);
		
		try {              
					
			connection=HibernateUtils.currentSession().connection();
			
			HashMap params = new HashMap();
			
			
			params.put("param_opddocpid", param_opddocpid);			
			 
			HttpSession session = request.getSession();
		 
			String ImageSavePath = QuickUtil.getImagePathForSaveWS(request, response,"reports");
			
			//String RIDASReportPath =AbstractController.getImagePathForSave(request, response, "reports");
			String reportPath = session.getServletContext().getRealPath("\\WEB-INF\\reports\\opdprescriptionreport.jasper");
			
			JasperPrint jasperPrint = JasperFillManager.fillReport(reportPath, params, connection);
			
			String filename="opdprescriptionreport_"+new Date().getTime()+".pdf";
			
			String reportSavePath=ImageSavePath+File.separator+filename; 
			System.out.println("filename "+filename);
			try {
				File filereport = new File(reportSavePath);
				if(filereport.exists())
				{
					filereport.delete();
				}
			} catch (Exception e) {
				
				e.printStackTrace();
			}
			JasperExportManager.exportReportToPdfFile(jasperPrint, reportSavePath);//(jasperPrint,servletOutputStream);
			
			String ImgPath = QuickUtil.getImagePathForWs(request, response,"reports");
			 
	        String result= ImgPath+""+filename;
	        String output="";
	        JSONObject jsonObject = new JSONObject();
	        jsonObject.put("FilePath", result);
	        output=jsonObject.toString();
	        System.out.println("Result="+output);
	        return Response.status(200).entity(output).build();
//	        		+ "//filename;
		}
		catch (Exception e) {
			
			e.printStackTrace();
		}
		finally
		{
			//done as on 17 mar 2016 to close database connection
			if(connection!=null){
				try {
					connection.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		return null;

	}
	
	@POST
	@Path("WS_Dummyjson")
	@Produces(MediaType.APPLICATION_JSON)
	public Response  WS_Dummyjson(
			@FormParam("salarylimit") BigDecimal salarylimit,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		
		Connection connection=null;
		System.out.println("salarylimit : "+salarylimit);
		
		try {              
			
//			String abc="{'Mith':{'Customers':[	    {      'Phone': '(26) 642-7012',      'PostalCode': '01-012',      'ContactName': 'MITHUN Zbyszek Piestrzeniewicz',      'Fax': '(26) 642-7012',      'Address': 'ul. Filtrowa 68',      'CustomerID': 'WOLZA',      'CompanyName': 'MITHUN Wolski  Zajazd',      'Country': 'Poland',      'City': 'Warszawa',      'ContactTitle': 'Owner'    },    {      'Phone': '(26) 642-7012999',      'PostalCode': '01-012999',      'ContactName': '999Zbyszek Piestrzeniewicz',      'Fax': '99(26) 642-7012',      'Address': '999ul. Filtrowa 68',      'CustomerID': '999WOLZA',      'CompanyName': '999Wolski  Zajazd',      'Country': '999Poland',      'City': '99Warszawa',      'ContactTitle': '99Owner'    },    {      'Phone': '88(26) 642-7012',      'PostalCode': '8801-012',      'ContactName': '88Zbyszek Piestrzeniewicz',      'Fax': '88(26) 642-7012',      'Address': '88ul. Filtrowa 68',      'CustomerID': '88WOLZA',      'CompanyName': '88Wolski  Zajazd',      'Country': '88Poland',      'City': '88Warszawa',      'ContactTitle': '88Owner'    }]}}";
			String abc="{'Mith':{'Customers':[	    {      'Phone': '(26) 642-7012',      'PostalCode': '01-012',      'ContactName': 'Zbyszek Piestrzeniewicz',      'Fax': '(26) 642-7012',      'Address': 'ul. Filtrowa 68',      'CustomerID': 'WOLZA',      'CompanyName': 'MITHUN Wolski  Zajazd',      'Country': 'Poland',      'City': 'Warszawa',      'ContactTitle': 'Owner',      'Designation':[      	{      		'post':'MANAGER1',			'salary':100      	},      	{      		'post':'MANAGER2',			'salary':200      	}      	      ]    },    {      'Phone': '(26) 642-7012999',      'PostalCode': '01-012999',      'ContactName': '999Zbyszek Piestrzeniewicz',      'Fax': '99(26) 642-7012',      'Address': '999ul. Filtrowa 68',      'CustomerID': '999WOLZA',      'CompanyName': '999Wolski  Zajazd',      'Country': '999Poland',      'City': '99Warszawa',      'ContactTitle': '99Owner',      'Designation':[      	{      		'post':'MANAGER12',			'salary':300      	},      	{      		'post':'MANAGER22',			'salary':400      	}      	      ]         },    {      'Phone': '88(26) 642-7012',      'PostalCode': '8801-012',      'ContactName': '88Zbyszek Piestrzeniewicz',      'Fax': '88(26) 642-7012',      'Address': '88ul. Filtrowa 68',      'CustomerID': '88WOLZA',      'CompanyName': '88Wolski  Zajazd',      'Country': '88Poland',      'City': '88Warszawa',      'ContactTitle': '88Owner',      'Designation':[      	{      		'post':'MANAGER13',			'salary':500      	},      	{      		'post':'MANAGER23456',			'salary':1226      	}      	      ]    }]}}";
			
//			JSONObject objroot=new JSONObject();
			
			InputStream is= new ByteArrayInputStream(abc.getBytes());
			
//			JsonDataSource datasource=new JsonDataSource(new ByteArrayInputStream(abc.getBytes())).subDataSource("");
//			connection=HibernateUtils.currentSession().connection();
			
			HashMap params = new HashMap();
			
			
			params.put("salarylimit", salarylimit);			
			params.put(JsonQueryExecuterFactory.JSON_INPUT_STREAM, is);
			
			HttpSession session = request.getSession();
		 
			String ImageSavePath = QuickUtil.getImagePathForSaveWS(request, response,"reports");
			
			//String RIDASReportPath =AbstractController.getImagePathForSave(request, response, "reports");
			String reportPath = session.getServletContext().getRealPath("\\WEB-INF\\reports\\dummyjsonreport1.jasper");
			
			JasperPrint jasperPrint = JasperFillManager.fillReport(reportPath, params);
			
			String filename="salarylimit"+salarylimit+".pdf";
			
			String reportSavePath=ImageSavePath+File.separator+filename; 
			System.out.println("filename "+filename);
			try {
				File filereport = new File(reportSavePath);
				if(filereport.exists())
				{
					filereport.delete();
				}
			} catch (Exception e) {
				
				e.printStackTrace();
			}
			JasperExportManager.exportReportToPdfFile(jasperPrint, reportSavePath);//(jasperPrint,servletOutputStream);
			
			String ImgPath = QuickUtil.getImagePathForWs(request, response,"reports");
			 
	        String result= ImgPath+""+filename;
	        String output="";
	        JSONObject jsonObject = new JSONObject();
	        jsonObject.put("FilePath", result);
	        output=jsonObject.toString();
	        System.out.println("Result="+output);
	        return Response.status(200).entity(output).build();
//	        		+ "//filename;
		}
		catch (Exception e) {
			
			e.printStackTrace();
		}
		finally
		{
			//done as on 17 mar 2016 to close database connection
			if(connection!=null){
				try {
					connection.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		return null;

	}
//	@POST
//	@Path("WS_beds_create")
//	@Produces(MediaType.APPLICATION_JSON)
//	public Response WS_beds_create(@FormParam("input0") String input0,
//			@Context HttpServletRequest request,
//			@Context HttpServletResponse response) {
//		System.out.println("MyApp.WS_beds_create()" + input0);
//		String proccommand = "CALL proc_beds_create(?,?,?)";
//		int[] types = { Types.VARCHAR, Types.VARCHAR };
//		Object[] inputvalues = { input0 };
//		String createSQLQuery;
//		String output = "[]";
//		try {
//			ArrayList callprocforoutputparamsV2 = QuickUtil
//					.callprocforoutputparamsV2(proccommand, inputvalues, types);
//			System.out.println("WS_beds_create Result="
//					+ callprocforoutputparamsV2.toString());
//			if (callprocforoutputparamsV2 != null
//					&& callprocforoutputparamsV2.size() > 0) {
//				if (callprocforoutputparamsV2.get(0) != null) {
//					output = (String) callprocforoutputparamsV2.get(0);
//				}
//			}
//		} catch (SQLException e) {
//			e.printStackTrace();
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//		return Response.status(200).entity(output).build();
//	}

 
}
