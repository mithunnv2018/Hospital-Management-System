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

@Path("/ipdbillingheadsmaster")
public class IpdbillingheadsMaster {

	@POST
	@Path("WS_ipdbillingheads_create")
	@Produces(MediaType.APPLICATION_JSON)
	public Response WS_ipdbillingheads_create(
			@FormParam("input0") String input0,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		System.out.println("MyApp.WS_ipdbillingheads_create()" + input0);
		String proccommand = "CALL proc_ipdbillingheads_create(?,?,?)";
		int[] types = { Types.VARCHAR, Types.VARCHAR };
		Object[] inputvalues = { input0 };
		String createSQLQuery;
		String output = "[]";
		try {
			ArrayList callprocforoutputparamsV2 = QuickUtil
					.callprocforoutputparamsV2(proccommand, inputvalues, types);
			System.out.println("WS_ipdbillingheads_create Result="
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
	@Path("WS_ipdbillingheads_update")
	@Produces(MediaType.APPLICATION_JSON)
	public Response WS_ipdbillingheads_update(
			@FormParam("input0") String input0,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		System.out.println("MyApp.WS_ipdbillingheads_update()" + input0);
		String proccommand = "CALL proc_ipdbillingheads_update(?,?,?)";
		int[] types = { Types.VARCHAR, Types.VARCHAR };
		Object[] inputvalues = { input0 };
		String createSQLQuery;
		String output = "[]";
		try {
			ArrayList callprocforoutputparamsV2 = QuickUtil
					.callprocforoutputparamsV2(proccommand, inputvalues, types);
			System.out.println("WS_ipdbillingheads_update Result="
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
	@Path("WS_VwIPDBillingHeadsHospital_selectjson")
	@Produces(MediaType.APPLICATION_JSON)
	public Response WS_VwIPDBillingHeadsHospital_selectjson(
			@FormParam("input0") String input0,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		System.out.println("MyApp.WS_VwIPDBillingHeadsHospital_selectjson()"
				+ input0);
		String proccommand = "CALL proc_VwIPDBillingHeadsHospital_selectjson(?,?,?)";
		int[] types = { Types.VARCHAR, Types.VARCHAR };
		Object[] inputvalues = { input0 };
		String createSQLQuery;
		String output = "[]";
		try {
			ArrayList callprocforoutputparamsV2 = QuickUtil
					.callprocforoutputparamsV2(proccommand, inputvalues, types);
			System.out
					.println("WS_VwIPDBillingHeadsHospital_selectjson Result="
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
	@Path("WS_ipdbillingheads_selectedit")
	@Produces(MediaType.APPLICATION_JSON)
	public Response WS_ipdbillingheads_selectedit(
			@FormParam("input0") String input0,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		System.out.println("MyApp.WS_ipdbillingheads_selectedit()" + input0);
		String proccommand = "CALL proc_ipdbillingheads_selectedit(?,?,?)";
		int[] types = { Types.VARCHAR, Types.VARCHAR };
		Object[] inputvalues = { input0 };
		String createSQLQuery;
		String output = "[]";
		try {
			ArrayList callprocforoutputparamsV2 = QuickUtil
					.callprocforoutputparamsV2(proccommand, inputvalues, types);
			System.out.println("WS_ipdbillingheads_selectedit Result="
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
