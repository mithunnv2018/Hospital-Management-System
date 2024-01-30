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

@Path("/sonographycharges")
public class Sonographycharges {
	@POST
	@Path("WS_hspsonographyheadsdetails_create")
	@Produces(MediaType.APPLICATION_JSON)
	public Response WS_hspsonographyheadsdetails_create(
			@FormParam("input0") String input0,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		System.out.println("MyApp.WS_hspsonographyheadsdetails_create()"
				+ input0);
		String proccommand = "CALL proc_hspsonographyheadsdetails_create(?,?,?)";
		int[] types = { Types.VARCHAR, Types.VARCHAR };
		Object[] inputvalues = { input0 };
		String createSQLQuery;
		String output = "[]";
		try {
			ArrayList callprocforoutputparamsV2 = QuickUtil
					.callprocforoutputparamsV2(proccommand, inputvalues, types);
			System.out.println("WS_hspsonographyheadsdetails_create Result="
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
	@Path("WS_vwhspsonographyheadsdetails_selectjson")
	@Produces(MediaType.APPLICATION_JSON)
	public Response WS_vwhspsonographyheadsdetails_selectjson(
			@FormParam("input0") String input0,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		System.out.println("MyApp.WS_vwhspsonographyheadsdetails_selectjson()"
				+ input0);
		String proccommand = "CALL proc_vwhspsonographyheadsdetails_selectjson(?,?,?)";
		int[] types = { Types.VARCHAR, Types.VARCHAR };
		Object[] inputvalues = { input0 };
		String createSQLQuery;
		String output = "[]";
		try {
			ArrayList callprocforoutputparamsV2 = QuickUtil
					.callprocforoutputparamsV2(proccommand, inputvalues, types);
			System.out
					.println("WS_vwhspsonographyheadsdetails_selectjson Result="
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
	@Path("WS_vwhspsonographyheadsdetails_delete")
	@Produces(MediaType.APPLICATION_JSON)
	public Response WS_vwhspsonographyheadsdetails_delete(
			@FormParam("input0") String input0,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		System.out.println("MyApp.WS_vwhspsonographyheadsdetails_delete()"
				+ input0);
		String proccommand = "CALL proc_hspsonographyheadsdetails_delete(?)";
		int[] types = {};
		Object[] inputvalues = { input0 };
		String createSQLQuery;
		String output = "[]";
		try {
			ArrayList callprocforoutputparamsV2 = QuickUtil
					.callprocforoutputparamsV2(proccommand, inputvalues, types);
			System.out.println("WS_vwhspsonographyheadsdetails_delete Result="
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
	@Path("WS_sonographyheads_HospitalIdSonographyHeads_drpjson")
	@Produces(MediaType.APPLICATION_JSON)
	public Response WS_sonographyheads_HospitalIdSonographyHeads_drpjson(
			@FormParam("input0") String input0,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		System.out
				.println("MyApp.WS_sonographyheads_HospitalIdSonographyHeads_drpjson()"
						+ input0);
		String proccommand = "CALL proc_sonographyheads_HospitalIdSonographyHeads_drpjson(?,?,?)";
		int[] types = { Types.VARCHAR, Types.VARCHAR };
		Object[] inputvalues = { input0 };
		String createSQLQuery;
		String output = "[]";
		try {
			ArrayList callprocforoutputparamsV2 = QuickUtil
					.callprocforoutputparamsV2(proccommand, inputvalues, types);
			System.out
					.println("WS_sonographyheads_HospitalIdSonographyHeads_drpjson Result="
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
	@Path("WS_GetAmountSonographyHeadsBySonographyHeadsId")
	@Produces(MediaType.APPLICATION_JSON)
	public Response WS_GetAmountSonographyHeadsBySonographyHeadsId(
			@FormParam("input0") String input0,
			@FormParam("input1") String input1,			
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		System.out.println("MyApp.WS_GetAmountSonographyHeadsBySonographyHeadsId()"
				+ input0+input1);
		String proccommand = "CALL procGetAmountSonographyHeadsBySonographyHeadsId(?,?,?)";
		int[] types = { Types.VARCHAR };
		Object[] inputvalues = { input0,input1 };
		String createSQLQuery;
		String output = "[]";
		try {
			ArrayList callprocforoutputparamsV2 = QuickUtil
					.callprocforoutputparamsV2(proccommand, inputvalues, types);
			System.out.println("WS_GetAmountSonographyHeadsBySonographyHeadsId Result="
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
	@Path("WS_hspsonographyheadsdetails_update")
	@Produces(MediaType.APPLICATION_JSON)
	public Response WS_hspsonographyheadsdetails_update(
			@FormParam("input0") String input0,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		System.out.println("MyApp.WS_hspsonographyheadsdetails_update()"
				+ input0);
		String proccommand = "CALL proc_hspsonographyheadsdetails_update(?,?,?)";
		int[] types = { Types.VARCHAR, Types.VARCHAR };
		Object[] inputvalues = { input0 };
		String createSQLQuery;
		String output = "[]";
		try {
			ArrayList callprocforoutputparamsV2 = QuickUtil
					.callprocforoutputparamsV2(proccommand, inputvalues, types);
			System.out.println("WS_hspsonographyheadsdetails_create Result="
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
	@Path("WS_hspsonographyheadsdetails_selectedit")
	@Produces(MediaType.APPLICATION_JSON)
	public Response WS_hspsonographyheadsdetails_selectedit(
			@FormParam("input0") String input0,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		System.out.println("MyApp.WS_hspsonographyheadsdetails_selectedit()"
				+ input0);
		String proccommand = "CALL proc_hspsonographyheadsdetails_selectedit(?,?,?)";
		int[] types = { Types.VARCHAR, Types.VARCHAR };
		Object[] inputvalues = { input0 };
		String createSQLQuery;
		String output = "[]";
		try {
			ArrayList callprocforoutputparamsV2 = QuickUtil
					.callprocforoutputparamsV2(proccommand, inputvalues, types);
			System.out.println("WS_hspsonographyheadsdetails_selectedit Result="
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
