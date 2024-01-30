package com.hmsws.test;

import static org.junit.Assert.*;

import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.ws.rs.core.Response;

import org.junit.Before;
import org.junit.Test;


import com.hmsws.util.QuickUtil;

import bussinessapi.AmountByWord;

public class MyTest {

	@Before
	public void setUp() throws Exception {
	}

//	@Test
//	public void testgetExamResult()
//	{
//		System.out.println("MyTest.testgetExamResult()");
//		try {
//			Response examResult = new MyApp().getExamResult("14156DB4001");
//			System.out.println("Result="+examResult.toString());
//		} catch (Exception e) {
//			 e.printStackTrace();
//		}
//	}
//	public void testsqlquery()
//	{
//		System.out.println("MyTest.testemailfeature()");
//		try {
//			String sql="SELECT a.student_name,a.student_id,a.exam_id,b.exam_sponsoringauth,b.exam_batchno,b.exam_division,b.exam_dateofexam FROM tbl_student_master a,tbl_exam_master b \r\n" + 
//					"WHERE a.student_enrollno='14156DB4001' AND a.exam_id=b.exam_id AND b.exam_status='active'";
//			
//			List<HashMap> createSQLQueryHashMap = QuickUtil.CreateSQLQueryHashMap(sql);
//			if (createSQLQueryHashMap.size() > 0) {
//
//				HashMap m= createSQLQueryHashMap.get(0);
//				Integer examid=(Integer) m.get("exam_id");
//				System.out.println("Examid="+examid);
//				Date examDateofexam = (Date) m.get("exam_dateofexam");
//				System.out.println("Stud name="+m.get("student_name")+examDateofexam.toString());
//				System.out.println("Stud name="+m.toString());
//			}
//			
//			
//		} catch (Exception e) {
//			 e.printStackTrace();
//		}
//	}
//	public void testemailfeature()
//	{
//		System.out.println("MyTest.testemailfeature()");
//		String name = "mithu";
//		String emailsave="atulkulve@gmail.com";
//		String phone="1234";
//		String coursetype="RegularCourse demo";
//		String courseselected="Adv. dip in ind safety demo";
//		String comments="my comment";
////		Response sendMailFormNifse = new MyApp().sendMailFormNifse(name, emailsave, phone, coursetype, courseselected, comments);
////		System.out.println("result="+sendMailFormNifse.toString());
//	}
//	public void test() {
//
//		bussinessapi.AmountByWord a=new AmountByWord();
//		try {
//			a.setLanguage("en");
//			a.setCurrency("IN");
//			
//			String amountByWord = a.getAmountByWord(115.45);
//			System.out.println("Result="+amountByWord);
//		} catch (Exception e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//	
//	}

}
