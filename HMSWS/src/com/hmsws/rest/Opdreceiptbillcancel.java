package com.hmsws.rest;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.apache.commons.io.FileUtils;
import org.json.JSONArray;
import org.json.JSONObject;

import com.hmsws.util.QuickUtil;
import com.sun.jersey.core.header.FormDataContentDisposition;
import com.sun.jersey.multipart.BodyPartEntity;
import com.sun.jersey.multipart.FormDataBodyPart;
import com.sun.jersey.multipart.FormDataMultiPart;
import com.sun.jersey.multipart.FormDataParam;

@Path("/opdreceiptbillcancel")
public class Opdreceiptbillcancel {

	@POST
	@Path("WS_opdbilldetails_cancel")
	@Produces(MediaType.APPLICATION_JSON)
	public Response WS_opdbilldetails_cancel(@FormParam("input0") String input0,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		System.out.println("MyApp.WS_opdbilldetails_cancel()" + input0);
		String proccommand = "CALL proc_opdbilldetails_cancel(?)";
		int[] types = { };
		Object[] inputvalues = { input0 };
		String createSQLQuery;
		String output = "[]";
		try {
			ArrayList callprocforoutputparamsV2 = QuickUtil
					.callprocforoutputparamsV2(proccommand, inputvalues, types);
			System.out.println("WS_opdbilldetails_cancel Result="
					+ callprocforoutputparamsV2.toString());
			if (callprocforoutputparamsV2 != null
					&& callprocforoutputparamsV2.size() > 0) {
				if (callprocforoutputparamsV2.get(0) != null) {
					output = (String) callprocforoutputparamsV2.get(0);
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Response.status(200).entity(output).build();
	}
	
	@POST
	@Path("WS_opdreceipt_cancel")
	@Produces(MediaType.APPLICATION_JSON)
	public Response WS_opdreceipt_cancel(@FormParam("input0") String input0,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		System.out.println("MyApp.WS_opdreceipt_cancel()" + input0);
		String proccommand = "CALL proc_opdreceipt_cancel(?)";
		int[] types = { };
		Object[] inputvalues = { input0 };
		String createSQLQuery;
		String output = "[]";
		try {
			ArrayList callprocforoutputparamsV2 = QuickUtil
					.callprocforoutputparamsV2(proccommand, inputvalues, types);
			System.out.println("WS_opdreceipt_cancel Result="
					+ callprocforoutputparamsV2.toString());
			if (callprocforoutputparamsV2 != null
					&& callprocforoutputparamsV2.size() > 0) {
				if (callprocforoutputparamsV2.get(0) != null) {
					output = (String) callprocforoutputparamsV2.get(0);
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Response.status(200).entity(output).build();
	}
	
	@POST
	@Path("WS_opdbilldetails_bydate_selectjson")
	@Produces(MediaType.APPLICATION_JSON)
	public Response WS_opdbilldetails_bydate_selectjson(
			@FormParam("input0") String input0,
			@FormParam("input1") String input1,
			@FormParam("input2") String input2,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		System.out.println("MyApp.WS_opdreceipt_cancel()" + input0+ input1+ input2);
		String proccommand = "CALL proc_opdbilldetails_bydate_selectjson(?,?,?,?,?)";
		int[] types = {Types.VARCHAR,Types.VARCHAR };
		Object[] inputvalues = { input0 ,input1 ,input2 };
		String createSQLQuery;
		String output = "[]";
		try {
			ArrayList callprocforoutputparamsV2 = QuickUtil
					.callprocforoutputparamsV2(proccommand, inputvalues, types);
			System.out.println("WS_opdbilldetails_bydate_selectjson Result="
					+ callprocforoutputparamsV2.toString());
			if (callprocforoutputparamsV2 != null
					&& callprocforoutputparamsV2.size() > 0) {
				if (callprocforoutputparamsV2.get(0) != null) {
					output = (String) callprocforoutputparamsV2.get(0);
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Response.status(200).entity(output).build();
	}
	
	@POST
	@Path("WS_opdreceipt_bydate_selectjson")
	@Produces(MediaType.APPLICATION_JSON)
	public Response WS_opdreceipt_bydate_selectjson(
			@FormParam("input0") String input0,
			@FormParam("input1") String input1,
			@FormParam("input2") String input2,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		System.out.println("MyApp.WS_opdreceipt_bydate_selectjson()" + input0+ input1+ input2);
		String proccommand = "CALL proc_opdreceipt_bydate_selectjson(?,?,?,?,?)";
		int[] types = {Types.VARCHAR,Types.VARCHAR };
		Object[] inputvalues = { input0 ,input1 ,input2 };
		String createSQLQuery;
		String output = "[]";
		try {
			ArrayList callprocforoutputparamsV2 = QuickUtil
					.callprocforoutputparamsV2(proccommand, inputvalues, types);
			System.out.println("WS_opdreceipt_bydate_selectjson Result="
					+ callprocforoutputparamsV2.toString());
			if (callprocforoutputparamsV2 != null
					&& callprocforoutputparamsV2.size() > 0) {
				if (callprocforoutputparamsV2.get(0) != null) {
					output = (String) callprocforoutputparamsV2.get(0);
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Response.status(200).entity(output).build();
	}

	@POST
	@Path("WS_VwOPDBillPrinting_bydate_selectjson")
	@Produces(MediaType.APPLICATION_JSON)
	public Response WS_VwOPDBillPrinting_bydate_selectjson(
			@FormParam("input0") String input0,
			@FormParam("input1") String input1,
			@FormParam("input2") String input2,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		System.out.println("MyApp.WS_VwOPDBillPrinting_bydate_selectjson()" + input0+ input1+ input2);
		String proccommand = "CALL proc_VwOPDBillPrinting_bydate_selectjson(?,?,?,?,?)";
		int[] types = {Types.VARCHAR,Types.VARCHAR };
		Object[] inputvalues = { input0 ,input1 ,input2 };
		String createSQLQuery;
		String output = "[]";
		try {
			ArrayList callprocforoutputparamsV2 = QuickUtil
					.callprocforoutputparamsV2(proccommand, inputvalues, types);
			System.out.println("WS_VwOPDBillPrinting_bydate_selectjson Result="
					+ callprocforoutputparamsV2.toString());
			if (callprocforoutputparamsV2 != null
					&& callprocforoutputparamsV2.size() > 0) {
				if (callprocforoutputparamsV2.get(0) != null) {
					output = (String) callprocforoutputparamsV2.get(0);
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Response.status(200).entity(output).build();
	}
	
	@POST
	@Path("WS_VwOPDReceiptPrinting_bydate_selectjson")
	@Produces(MediaType.APPLICATION_JSON)
	public Response WS_VwOPDReceiptPrinting_bydate_selectjson(
			@FormParam("input0") String input0,
			@FormParam("input1") String input1,
			@FormParam("input2") String input2,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		System.out.println("MyApp.WS_VwOPDReceiptPrinting_bydate_selectjson()" + input0+ input1+ input2);
		String proccommand = "CALL proc_VwOPDReceiptPrinting_bydate_selectjson(?,?,?,?,?)";
		int[] types = {Types.VARCHAR,Types.VARCHAR };
		Object[] inputvalues = { input0 ,input1 ,input2 };
		String createSQLQuery;
		String output = "[]";
		try {
			ArrayList callprocforoutputparamsV2 = QuickUtil
					.callprocforoutputparamsV2(proccommand, inputvalues, types);
			System.out.println("WS_VwOPDReceiptPrinting_bydate_selectjson Result="
					+ callprocforoutputparamsV2.toString());
			if (callprocforoutputparamsV2 != null
					&& callprocforoutputparamsV2.size() > 0) {
				if (callprocforoutputparamsV2.get(0) != null) {
					output = (String) callprocforoutputparamsV2.get(0);
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Response.status(200).entity(output).build();
	}
}
