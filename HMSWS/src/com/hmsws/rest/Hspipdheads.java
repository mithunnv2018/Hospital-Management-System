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

@Path("/hspipdheads")
public class Hspipdheads {
	@POST
	@Path("WS_hspipdbillingheadsdetails_create")
	@Produces(MediaType.APPLICATION_JSON)
	public Response WS_hspipdbillingheadsdetails_create(
			@FormParam("input0") String input0,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		System.out.println("MyApp.WS_hspipdbillingheadsdetails_create()"
				+ input0);
		String proccommand = "CALL proc_hspipdbillingheadsdetails_create(?,?,?)";
		int[] types = { Types.VARCHAR, Types.VARCHAR };
		Object[] inputvalues = { input0 };
		String createSQLQuery;
		String output = "[]";
		try {
			ArrayList callprocforoutputparamsV2 = QuickUtil
					.callprocforoutputparamsV2(proccommand, inputvalues, types);
			System.out.println("WS_hspipdbillingheadsdetails_create Result="
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
	@Path("WS_vwhspipdbillingheadsdetails_selectjson")
	@Produces(MediaType.APPLICATION_JSON)
	public Response WS_vwhspipdbillingheadsdetails_selectjson(
			@FormParam("input0") String input0,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		System.out.println("MyApp.WS_vwhspipdbillingheadsdetails_selectjson()"
				+ input0);
		String proccommand = "CALL proc_vwhspipdbillingheadsdetails_selectjson(?,?,?)";
		int[] types = { Types.VARCHAR, Types.VARCHAR };
		Object[] inputvalues = { input0 };
		String createSQLQuery;
		String output = "[]";
		try {
			ArrayList callprocforoutputparamsV2 = QuickUtil
					.callprocforoutputparamsV2(proccommand, inputvalues, types);
			System.out
					.println("WS_vwhspipdbillingheadsdetails_selectjson Result="
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
	@Path("WS_ipdbillingheads_HospitalIdIPDBillingHeads_drpjson")
	@Produces(MediaType.APPLICATION_JSON)
	public Response WS_ipdbillingheads_HospitalIdIPDBillingHeads_drpjson(
			@FormParam("input0") String input0,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		System.out
				.println("MyApp.WS_ipdbillingheads_HospitalIdIPDBillingHeads_drpjson()"
						+ input0);
		String proccommand = "CALL proc_ipdbillingheads_HospitalIdIPDBillingHeads_drpjson(?,?,?)";
		int[] types = { Types.VARCHAR, Types.VARCHAR };
		Object[] inputvalues = { input0 };
		String createSQLQuery;
		String output = "[]";
		try {
			ArrayList callprocforoutputparamsV2 = QuickUtil
					.callprocforoutputparamsV2(proccommand, inputvalues, types);
			System.out
					.println("WS_ipdbillingheads_HospitalIdIPDBillingHeads_drpjson Result="
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
	@Path("WS_hspipdbillingheadsdetails_delete")
	@Produces(MediaType.APPLICATION_JSON)
	public Response WS_hspipdbillingheadsdetails_delete(
			@FormParam("input0") String input0,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		System.out
				.println("MyApp.WS_hspipdbillingheadsdetails_delete()"
						+ input0);
		String proccommand = "CALL proc_hspipdbillingheadsdetails_delete(?)";
		int[] types = {  };
		Object[] inputvalues = { input0 };
		String createSQLQuery;
		String output = "[]";
		try {
			ArrayList callprocforoutputparamsV2 = QuickUtil
					.callprocforoutputparamsV2(proccommand, inputvalues, types);
			System.out
					.println("WS_hspipdbillingheadsdetails_delete Result="
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
	@Path("WS_GetAmountIPDBillingHeadsByIPDBillingHeadsId")
	@Produces(MediaType.APPLICATION_JSON)
	public Response WS_GetAmountIPDBillingHeadsByIPDBillingHeadsId(
			@FormParam("input0") String input0,
			@FormParam("input1") String input1,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		System.out.println("MyApp.WS_GetAmountIPDBillingHeadsByIPDBillingHeadsId()" + input0+input1);
		String proccommand = "CALL procGetAmountIPDBillingHeadsByIPDBillingHeadsId(?,?,?)";
		int[] types = { Types.VARCHAR };
		Object[] inputvalues = { input0,input1 };
		String createSQLQuery;
		String output = "[]";
		try {
			ArrayList callprocforoutputparamsV2 = QuickUtil
					.callprocforoutputparamsV2(proccommand, inputvalues, types);
			System.out.println("WS_GetAmountIPDBillingHeadsByIPDBillingHeadsId Result="
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
	@Path("WS_hspipdbillingheadsdetails_update")
	@Produces(MediaType.APPLICATION_JSON)
	public Response WS_hspipdbillingheadsdetails_update(
			@FormParam("input0") String input0,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		System.out.println("MyApp.WS_hspipdbillingheadsdetails_update()"
				+ input0);
		String proccommand = "CALL proc_hspipdbillingheadsdetails_update(?,?,?)";
		int[] types = { Types.VARCHAR, Types.VARCHAR };
		Object[] inputvalues = { input0 };
		String createSQLQuery;
		String output = "[]";
		try {
			ArrayList callprocforoutputparamsV2 = QuickUtil
					.callprocforoutputparamsV2(proccommand, inputvalues, types);
			System.out.println("WS_hspipdbillingheadsdetails_update Result="
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
	@Path("WS_hspipdbillingheadsdetails_selectedit")
	@Produces(MediaType.APPLICATION_JSON)
	public Response WS_hspipdbillingheadsdetails_selectedit(
			@FormParam("input0") String input0,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		System.out.println("MyApp.WS_hspipdbillingheadsdetails_selectedit()"
				+ input0);
		String proccommand = "CALL proc_hspipdbillingheadsdetails_selectedit(?,?,?)";
		int[] types = { Types.VARCHAR, Types.VARCHAR };
		Object[] inputvalues = { input0 };
		String createSQLQuery;
		String output = "[]";
		try {
			ArrayList callprocforoutputparamsV2 = QuickUtil
					.callprocforoutputparamsV2(proccommand, inputvalues, types);
			System.out.println("WS_hspipdbillingheadsdetails_selectedit Result="
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
