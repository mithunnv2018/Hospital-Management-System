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

@Path("/hospitalization")
public class Hospitalization {

	@POST
	@Path("WS_hospitalization_create")
	@Produces(MediaType.APPLICATION_JSON)
	public Response WS_hospitalization_create(
			@FormParam("input0") String input0,
			@FormParam("input1") String input1,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		System.out.println("MyApp.WS_hospitalization_create()" + input0
				+ input1);
		String proccommand = "CALL proc_hospitalization_create(?,?,?,?)";
		int[] types = { Types.VARCHAR, Types.VARCHAR };
		Object[] inputvalues = { input0, input1 };
		String createSQLQuery;
		String output = "[]";
		try {
			ArrayList callprocforoutputparamsV2 = QuickUtil
					.callprocforoutputparamsV2(proccommand, inputvalues, types);
			System.out.println("WS_hospitalization_create Result="
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
	@Path("WS_viewhospitalizationipd_selectedit")
	@Produces(MediaType.APPLICATION_JSON)
	public Response WS_viewhospitalizationipd_selectedit(
			@FormParam("input0") String input0,

			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		System.out.println("MyApp.WS_viewhospitalizationipd_selectedit()"
				+ input0);
		String proccommand = "CALL proc_viewhospitalizationipd_selectedit(?,?)";
		int[] types = { Types.VARCHAR };
		Object[] inputvalues = { input0 };
		String createSQLQuery;
		String output = "[]";
		try {
			ArrayList callprocforoutputparamsV2 = QuickUtil
					.callprocforoutputparamsV2(proccommand, inputvalues, types);
			System.out.println("WS_viewhospitalizationipd_selectedit Result="
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
	@Path("WS_viewhospitalizationipd_selectjson_Admitted")
	@Produces(MediaType.APPLICATION_JSON)
	public Response WS_viewhospitalizationipd_selectjson_Admitted(
			@FormParam("input0") String input0,

			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		System.out
				.println("MyApp.WS_viewhospitalizationipd_selectjson_Admitted()"
						+ input0);
		String proccommand = "CALL proc_viewhospitalizationipd_selectjson_Admitted(?,?,?)";
		int[] types = { Types.VARCHAR, Types.VARCHAR };
		Object[] inputvalues = { input0 };
		String createSQLQuery;
		String output = "[]";
		try {
			ArrayList callprocforoutputparamsV2 = QuickUtil
					.callprocforoutputparamsV2(proccommand, inputvalues, types);
			System.out
					.println("WS_viewhospitalizationipd_selectjson_Admitted Result="
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
	@Path("WS_viewhospitalizationipd_selectjson_Admitted_searchtext")
	@Produces(MediaType.APPLICATION_JSON)
	public Response WS_viewhospitalizationipd_selectjson_Admitted_searchtext(
			@FormParam("input0") String input0,
			@FormParam("input1") String input1,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		System.out
				.println("MyApp.WS_viewhospitalizationipd_selectjson_Admitted_searchtext()"
						+ input0);
		String proccommand = "CALL proc_viewhospitalizationipd_selectjson_Admitted_searchtext(?,?,?,?)";
		int[] types = { Types.VARCHAR, Types.VARCHAR };
		Object[] inputvalues = { input0, input1 };
		String createSQLQuery;
		String output = "[]";
		try {
			ArrayList callprocforoutputparamsV2 = QuickUtil
					.callprocforoutputparamsV2(proccommand, inputvalues, types);
			System.out
					.println("WS_viewhospitalizationipd_selectjson_Admitted_searchtext Result="
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
	@Path("WS_viewhospitalizationipd_selectjson_Discharged")
	@Produces(MediaType.APPLICATION_JSON)
	public Response WS_viewhospitalizationipd_selectjson_Discharged(
			@FormParam("input0") String input0,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		System.out
				.println("MyApp.WS_viewhospitalizationipd_selectjson_Discharged()"
						+ input0);
		String proccommand = "CALL proc_viewhospitalizationipd_selectjson_Discharged(?,?,?)";
		int[] types = { Types.VARCHAR, Types.VARCHAR };
		Object[] inputvalues = { input0 };
		String createSQLQuery;
		String output = "[]";
		try {
			ArrayList callprocforoutputparamsV2 = QuickUtil
					.callprocforoutputparamsV2(proccommand, inputvalues, types);
			System.out
					.println("WS_viewhospitalizationipd_selectjson_Discharged Result="
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
	@Path("WS_viewhospitalizationipd_selectjson_Discharged_SearchText")
	@Produces(MediaType.APPLICATION_JSON)
	public Response WS_viewhospitalizationipd_selectjson_Discharged_SearchText(
			@FormParam("input0") String input0,
			@FormParam("input1") String input1,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		System.out
				.println("MyApp.WS_viewhospitalizationipd_selectjson_Discharged_SearchText()"
						+ input0 + input1);
		String proccommand = "CALL proc_viewhospitalizationipd_selectjson_Discharged_SearchText(?,?,?,?)";
		int[] types = { Types.VARCHAR, Types.VARCHAR };
		Object[] inputvalues = { input0, input1 };
		String createSQLQuery;
		String output = "[]";
		try {
			ArrayList callprocforoutputparamsV2 = QuickUtil
					.callprocforoutputparamsV2(proccommand, inputvalues, types);
			System.out
					.println("WS_viewhospitalizationipd_selectjson_Discharged_SearchText Result="
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
	@Path("WS_viewhospitalizationipd_selectjson_Canceled")
	@Produces(MediaType.APPLICATION_JSON)
	public Response WS_viewhospitalizationipd_selectjson_Canceled(
			@FormParam("input0") String input0,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		System.out
				.println("MyApp.WS_viewhospitalizationipd_selectjson_Canceled()"
						+ input0);
		String proccommand = "CALL proc_viewhospitalizationipd_selectjson_Canceled(?,?,?)";
		int[] types = { Types.VARCHAR, Types.VARCHAR };
		Object[] inputvalues = { input0 };
		String createSQLQuery;
		String output = "[]";
		try {
			ArrayList callprocforoutputparamsV2 = QuickUtil
					.callprocforoutputparamsV2(proccommand, inputvalues, types);
			System.out
					.println("WS_viewhospitalizationipd_selectjson_Canceled Result="
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
	@Path("WS_viewhospitalizationipd_selectjson_Canceled_searchtext")
	@Produces(MediaType.APPLICATION_JSON)
	public Response WS_viewhospitalizationipd_selectjson_Canceled_searchtext(
			@FormParam("input0") String input0,
			@FormParam("input1") String input1,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		System.out
				.println("MyApp.WS_viewhospitalizationipd_selectjson_Canceled_searchtext()"
						+ input0 + input1);
		String proccommand = "CALL proc_viewhospitalizationipd_selectjson_Canceled_searchtext(?,?,?,?)";
		int[] types = { Types.VARCHAR, Types.VARCHAR };
		Object[] inputvalues = { input0, input1 };
		String createSQLQuery;
		String output = "[]";
		try {
			ArrayList callprocforoutputparamsV2 = QuickUtil
					.callprocforoutputparamsV2(proccommand, inputvalues, types);
			System.out
					.println("WS_viewhospitalizationipd_selectjson_Canceled_searchtext Result="
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
	@Path("WS_ipdmaster_HospitalIdIPDMaster_drpjson")
	@Produces(MediaType.APPLICATION_JSON)
	public Response WS_ipdmaster_HospitalIdIPDMaster_drpjson(
			@FormParam("input0") String input0,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		System.out.println("MyApp.WS_ipdmaster_HospitalIdIPDMaster_drpjson()"
				+ input0);
		String proccommand = "CALL proc_ipdmaster_HospitalIdIPDMaster_drpjson(?,?,?)";
		int[] types = { Types.VARCHAR, Types.VARCHAR };
		Object[] inputvalues = { input0 };
		String createSQLQuery;
		String output = "[]";
		try {
			ArrayList callprocforoutputparamsV2 = QuickUtil
					.callprocforoutputparamsV2(proccommand, inputvalues, types);
			System.out
					.println("WS_ipdmaster_HospitalIdIPDMaster_drpjson Result="
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
	@Path("WS_Package_HospitalIdPackage_drpjson")
	@Produces(MediaType.APPLICATION_JSON)
	public Response WS_Package_HospitalIdPackage_drpjson(
			@FormParam("input0") String input0,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		System.out.println("MyApp.WS_Package_HospitalIdPackage_drpjson()"
				+ input0);
		String proccommand = "CALL proc_Package_HospitalIdPackage_drpjson(?,?,?)";
		int[] types = { Types.VARCHAR, Types.VARCHAR };
		Object[] inputvalues = { input0 };
		String createSQLQuery;
		String output = "[]";
		try {
			ArrayList callprocforoutputparamsV2 = QuickUtil
					.callprocforoutputparamsV2(proccommand, inputvalues, types);
			System.out.println("WS_Package_HospitalIdPackage_drpjson Result="
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
	@Path("WS_Trust_HospitalIdTrust_drpjson")
	@Produces(MediaType.APPLICATION_JSON)
	public Response WS_Trust_HospitalIdTrust_drpjson(
			@FormParam("input0") String input0,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		System.out.println("MyApp.WS_Trust_HospitalIdTrust_drpjson()" + input0);
		String proccommand = "CALL proc_Trust_HospitalIdTrust_drpjson(?,?,?)";
		int[] types = { Types.VARCHAR, Types.VARCHAR };
		Object[] inputvalues = { input0 };
		String createSQLQuery;
		String output = "[]";
		try {
			ArrayList callprocforoutputparamsV2 = QuickUtil
					.callprocforoutputparamsV2(proccommand, inputvalues, types);
			System.out.println("WS_Trust_HospitalIdTrust_drpjson Result="
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
	@Path("WS_Categorymaster_HospitalIdCategoryMaster_drpjson")
	@Produces(MediaType.APPLICATION_JSON)
	public Response WS_Categorymaster_HospitalIdCategoryMaster_drpjson(
			@FormParam("input0") String input0,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		System.out
				.println("MyApp.WS_Categorymaster_HospitalIdCategoryMaster_drpjson()"
						+ input0);
		String proccommand = "CALL proc_Categorymaster_HospitalIdCategoryMaster_drpjson(?,?,?)";
		int[] types = { Types.VARCHAR, Types.VARCHAR };
		Object[] inputvalues = { input0 };
		String createSQLQuery;
		String output = "[]";
		try {
			ArrayList callprocforoutputparamsV2 = QuickUtil
					.callprocforoutputparamsV2(proccommand, inputvalues, types);
			System.out
					.println("WS_Categorymaster_HospitalIdCategoryMaster_drpjson Result="
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
	@Path("WS_Diseasemaster_HospitalIdDiseaseMaster_drpjson")
	@Produces(MediaType.APPLICATION_JSON)
	public Response WS_Diseasemaster_HospitalIdDiseaseMaster_drpjson(
			@FormParam("input0") String input0,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		System.out
				.println("MyApp.WS_Diseasemaster_HospitalIdDiseaseMaster_drpjson()"
						+ input0);
		String proccommand = "CALL proc_Diseasemaster_HospitalIdDiseaseMaster_drpjson(?,?,?)";
		int[] types = { Types.VARCHAR, Types.VARCHAR };
		Object[] inputvalues = { input0 };
		String createSQLQuery;
		String output = "[]";
		try {
			ArrayList callprocforoutputparamsV2 = QuickUtil
					.callprocforoutputparamsV2(proccommand, inputvalues, types);
			System.out
					.println("WS_Diseasemaster_HospitalIdDiseaseMaster_drpjson Result="
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
	@Path("WS_ipdmaster_HospitalIdIPDMaster_SearchName_drpjson")
	@Produces(MediaType.APPLICATION_JSON)
	public Response WS_ipdmaster_HospitalIdIPDMaster_drpjson(
			@FormParam("input0") String input0,
			@FormParam("input1") String input1,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		System.out.println("MyApp.WS_ipdmaster_HospitalIdIPDMaster_drpjson()"
				+ input0);
		String proccommand = "CALL proc_ipdmaster_HospitalIdIPDMaster_SearchName_drpjson(?,?,?,?)";
		int[] TYPES = { Types.VARCHAR, Types.VARCHAR };
		Object[] inputvalues = { input0, input1 };
		String createSQLQuery;
		String output = "[]";
		try {
			ArrayList callprocforoutputparamsV2 = QuickUtil
					.callprocforoutputparamsV2(proccommand, inputvalues, TYPES);
			System.out
					.println("WS_ipdmaster_HospitalIdIPDMaster_SearchName_drpjson Result="
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
	@Path("WS_doctormaster_HospitalIdDoctorMaster_byDoctorName_drpjson")
	@Produces(MediaType.APPLICATION_JSON)
	public Response WS_doctormaster_HospitalIdDoctorMaster_byDoctorName_drpjson(
			@FormParam("input0") String input0,
			@FormParam("input1") String input1,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		System.out.println("MyApp.WS_doctormaster_HospitalIdDoctorMaster_byDoctorName_drpjson()"
				+ input0);
		String proccommand = "CALL proc_doctormaster_HospitalIdDoctorMaster_byDoctorName_drpjson(?,?,?,?)";
		int[] TYPES = { Types.VARCHAR, Types.VARCHAR };
		Object[] inputvalues = { input0, input1 };
		String createSQLQuery;
		String output = "[]";
		try {
			ArrayList callprocforoutputparamsV2 = QuickUtil
					.callprocforoutputparamsV2(proccommand, inputvalues, TYPES);
			System.out
					.println("WS_doctormaster_HospitalIdDoctorMaster_byDoctorName_drpjson Result="
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
	@Path("WS_hospitalization_update")
	@Produces(MediaType.APPLICATION_JSON)
	public Response WS_hospitalization_update(
			@FormParam("input0") String input0,
			@FormParam("input1") String input1,
			@Context HttpServletRequest request,
			@Context HttpServletResponse response) {
		System.out.println("MyApp.WS_hospitalization_update()"
				+ input0);
		String proccommand = "CALL proc_hospitalization_update(?,?,?,?)";
		int[] TYPES = { Types.VARCHAR, Types.VARCHAR };
		Object[] inputvalues = { input0, input1 };
		String createSQLQuery;
		String output = "[]";
		try {
			ArrayList callprocforoutputparamsV2 = QuickUtil
					.callprocforoutputparamsV2(proccommand, inputvalues, TYPES);
			System.out
					.println("WS_hospitalization_update Result="
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
