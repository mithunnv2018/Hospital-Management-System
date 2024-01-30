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

@Path("/ipdpapers")
public class IPDPapers {

	@POST
	@Path("WS_hospitalization_IPDIdHospitalization_selectjson")
	@Produces(MediaType.APPLICATION_JSON)
	public Response WS_hospitalization_IPDIdHospitalization_selectjson(
			@FormParam("input0") String input0,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		System.out
				.println("MyApp.WS_hospitalization_IPDIdHospitalization_selectjson()"
						+ input0);
		String proccommand = "CALL proc_hospitalization_IPDIdHospitalization_selectjson(?,?,?)";
		int[] types = { Types.VARCHAR, Types.VARCHAR };
		Object[] inputvalues = { input0 };
		String createSQLQuery;
		String output = "[]";
		try {
			ArrayList callprocforoutputparamsV2 = QuickUtil
					.callprocforoutputparamsV2(proccommand, inputvalues, types);
			System.out
					.println("WS_hospitalization_IPDIdHospitalization_selectjson Result="
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
	@Path("WS_IPDPapers_selectjson_fileupload")
	@Produces(MediaType.APPLICATION_JSON)
	public Response WS_IPDPapers_selectjson_fileupload(
			@FormParam("input0") String input0,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		System.out.println("MyApp.WS_IPDPapers_selectjson_fileupload()"
				+ input0);
		String proccommand = "CALL proc_IPDPapers_selectjson_fileupload(?,?,?)";
		int[] types = { Types.VARCHAR, Types.VARCHAR };
		Object[] inputvalues = { input0 };
		String createSQLQuery;
		String output = "[]";
		try {
			ArrayList callprocforoutputparamsV2 = QuickUtil
					.callprocforoutputparamsV2(proccommand, inputvalues, types);
			System.out.println("WS_IPDPapers_selectjson_fileupload Result="
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
	@Path("WS_hospitalization_IPDIdHospitalization_drpjson")
	@Produces(MediaType.APPLICATION_JSON)
	public Response WS_hospitalization_IPDIdHospitalization_drpjson(
			@FormParam("input0") String input0,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		System.out
				.println("MyApp.WS_hospitalization_IPDIdHospitalization_drpjson()"
						+ input0);
		String proccommand = "CALL proc_hospitalization_IPDIdHospitalization_drpjson(?,?,?)";
		int[] types = { Types.VARCHAR, Types.VARCHAR };
		Object[] inputvalues = { input0 };
		String createSQLQuery;
		String output = "[]";
		try {
			ArrayList callprocforoutputparamsV2 = QuickUtil
					.callprocforoutputparamsV2(proccommand, inputvalues, types);
			System.out
					.println("WS_hospitalization_IPDIdHospitalization_drpjson Result="
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
	@Path("WS_IPDPapers_selectjson")
	@Produces(MediaType.APPLICATION_JSON)
	public Response WS_IPDPapers_selectjson(
			@FormParam("input0") String input0,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		System.out
				.println("MyApp.WS_IPDPapers_selectjson()"
						+ input0);
		String proccommand = "CALL proc_IPDPapers_selectjson(?,?,?)";
		int[] types = { Types.VARCHAR, Types.VARCHAR };
		Object[] inputvalues = { input0 };
		String createSQLQuery;
		String output = "[]";
		try {
			ArrayList callprocforoutputparamsV2 = QuickUtil
					.callprocforoutputparamsV2(proccommand, inputvalues, types);
			System.out
					.println("WS_IPDPapers_selectjson Result="
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
	@Path("WS_IPDPapers_create")
	@Produces(MediaType.APPLICATION_JSON)
	public Response WS_IPDPapers_create(
			@FormParam("input0") String input0,
			@FormParam("input1") String input1,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		System.out
				.println("MyApp.WS_IPDPapers_selectjson()"
						+ input0);
		String proccommand = "CALL proc_IPDPapers_create(?,?,?,?)";
		int[] types = { Types.VARCHAR, Types.VARCHAR };
		Object[] inputvalues = { input0,input1 };
		String createSQLQuery;
		String output = "[]";
		try {
			ArrayList callprocforoutputparamsV2 = QuickUtil
					.callprocforoutputparamsV2(proccommand, inputvalues, types);
			System.out
					.println("WS_IPDPapers_create Result="
							+ callprocforoutputparamsV2.toString());
			if (callprocforoutputparamsV2 != null
					&& callprocforoutputparamsV2.size() > 0) {
				if (callprocforoutputparamsV2.get(0) != null) {
					output = (String) callprocforoutputparamsV2.get(0);
				}
				if (callprocforoutputparamsV2.get(1) != null) {
					// output=(String) callprocforoutputparamsV2.get(0);

					String uploadedFileLocation = QuickUtil
							.getImagePathForSaveWS(request, response, "temp");

					String realuploadedFileLocation = QuickUtil
							.getImagePathForSaveWS(request, response, "real");
					String object = (String) callprocforoutputparamsV2.get(1);

					JSONArray jsonArray = new JSONArray(object);
					if (jsonArray.length() > 0) {
						for (int i = 0; i < jsonArray.length(); i++) {
							JSONObject jsonObject = jsonArray.getJSONObject(i);
							String uploadfile_path = jsonObject
									.getString("uploadfile_path");
							String uploadfile_type = jsonObject
									.getString("uploadfile_type");
							String uploadfile_status = jsonObject
									.getString("uploadfile_status");
							String uploadfile_filename = jsonObject
									.getString("uploadfile_filename");
							String uploadfile_actulalfilename = jsonObject
									.getString("uploadfile_actulalfilename");

							String oldfile = uploadedFileLocation
									+ uploadfile_actulalfilename;
							String newfile = realuploadedFileLocation
									+ uploadfile_filename;

							File file2 = new File(oldfile);
							File filenew = new File(newfile);
							if (uploadfile_status.equalsIgnoreCase("Yes")
									&& file2.exists()) {
								FileUtils.copyFile(file2, filenew);
								boolean delete = file2.delete();
								System.out.println(oldfile + " deleted here ="
										+ delete);
							}
							if (uploadfile_status.equalsIgnoreCase("Delete")) {

							}

						}

					}
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
	@Path("WS_IPDPapers_create_fileupload")
	@Produces(MediaType.APPLICATION_JSON)
	public Response WS_IPDPapers_create_fileupload(
			@FormParam("input0") String input0,
			@FormParam("input1") String input1,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		System.out
				.println("WS_IPDPapers_create_fileupload()"
						+ input0);
		String proccommand = "CALL proc_IPDPapers_create_fileupload(?,?,?,?)";
		int[] types = { Types.VARCHAR, Types.VARCHAR };
		Object[] inputvalues = { input0,input1 };
		String createSQLQuery;
		String output = "[]";
		try {
			ArrayList callprocforoutputparamsV2 = QuickUtil
					.callprocforoutputparamsV2(proccommand, inputvalues, types);
			System.out
					.println("WS_IPDPapers_create_fileupload Result="
							+ callprocforoutputparamsV2.toString());
			if (callprocforoutputparamsV2 != null
					&& callprocforoutputparamsV2.size() > 0) {
				if (callprocforoutputparamsV2.get(0) != null) {
					output = (String) callprocforoutputparamsV2.get(0);
				}
				if (callprocforoutputparamsV2.get(1) != null) {
					// output=(String) callprocforoutputparamsV2.get(0);

					String uploadedFileLocation = QuickUtil
							.getImagePathForSaveWS(request, response, "temp");

					String realuploadedFileLocation = QuickUtil
							.getImagePathForSaveWS(request, response, "real");
					String object = (String) callprocforoutputparamsV2.get(1);

					JSONArray jsonArray = new JSONArray(object);
					if (jsonArray.length() > 0) {
						for (int i = 0; i < jsonArray.length(); i++) {
							JSONObject jsonObject = jsonArray.getJSONObject(i);
							String uploadfile_path = jsonObject
									.getString("uploadfile_path");
							String uploadfile_type = jsonObject
									.getString("uploadfile_type");
							String uploadfile_status = jsonObject
									.getString("uploadfile_status");
							String uploadfile_filename = jsonObject
									.getString("uploadfile_filename");
							String uploadfile_actulalfilename = jsonObject
									.getString("uploadfile_actulalfilename");

							String oldfile = uploadedFileLocation
									+ uploadfile_actulalfilename;
							String newfile = realuploadedFileLocation
									+ uploadfile_filename;

							File file2 = new File(oldfile);
							File filenew = new File(newfile);
							if (uploadfile_status.equalsIgnoreCase("Yes")
									&& file2.exists()) {
								FileUtils.copyFile(file2, filenew);
								boolean delete = file2.delete();
								System.out.println(oldfile + " deleted here ="
										+ delete);
							}
							if (uploadfile_status.equalsIgnoreCase("Delete")) {

							}

						}

					}
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
	@Path("WS_tbl_uploadedfile_master_delete")
	@Produces(MediaType.APPLICATION_JSON)
	public Response WS_tbl_uploadedfile_master_delete(
			@FormParam("input0") Integer input0,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		System.out
				.println("MyApp.WS_tbl_uploadedfile_master_delete()"
						+ input0);
		String proccommand = "CALL proc_tbl_uploadedfile_master_delete(?,?)";
		int[] types = { Types.VARCHAR };
		Object[] inputvalues = { input0 };
		String createSQLQuery;
		String output = "[]";
		try {
			ArrayList callprocforoutputparamsV2 = QuickUtil
					.callprocforoutputparamsV2(proccommand, inputvalues, types);
			System.out
					.println("WS_tbl_uploadedfile_master_delete Result="
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
