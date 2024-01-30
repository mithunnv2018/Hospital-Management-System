package com.hmsws.util;

import java.io.File;
import java.io.IOException;
import java.util.Calendar;
import java.util.Date;
import java.util.Timer;
import java.util.TimerTask;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

public class ServletContextClass implements ServletContextListener
    {
           

    public void contextInitialized(ServletContextEvent arg0) 
    {
    	System.out.println("ServletContextClass.contextInitialized() HII MITH ");
    	try {
    		Timer time = new Timer(); // Instantiate Timer Object
    		ScheduledTask st = new ScheduledTask(); // Instantiate SheduledTask class
    		Calendar instance = Calendar.getInstance();
    		instance.set(Calendar.HOUR_OF_DAY, 16);
    		instance.set(Calendar.MINUTE, 30);
    		instance.set(Calendar.SECOND, 0);
    		Date today=instance.getTime();
    		time.schedule(st, today,86400000);//, 1000); 
    		
		} catch (Exception e) {
			 e.printStackTrace();
		}
    	
    }//end contextInitialized method


    public void contextDestroyed(ServletContextEvent arg0) 
    {
        System.out.println("ServletContextClass.contextDestroyed() DONE MITH");       
    }//end constextDestroyed method

    
    class ScheduledTask extends TimerTask {

    	String dbname="admin_hms";
    	String uname="root";
    	String pass="pass";
    	String host="localhost";
    	String BACKUPPATH="D:\\mysqlbackupHMS\\";
//    	String mysqlcommandpath="c:\\Program Files\\MySQL\\MySQL Server 5.7\\bin\\mysqldump.exe";
    	String mysqlcommandpath="C:\\Program Files\\MySQL\\MySQL Server 5.7\\bin\\mysqldump.exe";
    	
    	// Add your task here
    	public void run() {
    		
    		File o=new File(mysqlcommandpath);
    		if(o.exists()==false){
    			return;
    		}
    		File o2=new File(BACKUPPATH);
    		if(o2.exists()==false){
    			return;
    		}
    		System.out.println("Starting backup "+new Date());
    		String backupfilename=BACKUPPATH+"ADMIN_HMS_"+new Date().getTime()+".sql";
    		File f =new File(BACKUPPATH);
    		f.mkdir();
    		
    		//for STOREDPROCEDURES use this attribute "--routines"
    		String executCmd=mysqlcommandpath+" --single-transaction -u"+uname+" -p"+pass+" -h"+host+" "+dbname+" -r "+backupfilename;
    		
    		try {
				
    			Process exec = Runtime.getRuntime().exec(executCmd);
				System.out.println("The exec command is ==>"+executCmd);
				int waitFor = exec.waitFor();
				
				if(waitFor==0){
					System.out.println("YES! BACKUP COMPLETED ON "+new Date().toString());
				}
				else{
					System.out.println("NO! BACKUP FAILED ON "+new Date().toString());
				}
			} catch (IOException | InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
    		
    		
    	}
    }
}