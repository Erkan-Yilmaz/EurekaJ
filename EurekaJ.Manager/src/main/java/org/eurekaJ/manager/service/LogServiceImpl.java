package org.eurekaJ.manager.service;

import java.util.List;

import org.eurekaJ.manager.berkeley.logentry.LogEntry;
import org.eurekaJ.manager.dao.berkeley.LogDao;


public class LogServiceImpl implements LogService {
	private LogDao logDao;
	
	public LogDao getLogDao() {
		return logDao;
	}
	
	public void setLogDao(LogDao logDao) {
		this.logDao = logDao;
	}
	
	public LogEntry getLogEntry(String agentName, Long millisecond) {
		return logDao.getLogEntry(agentName, millisecond);
	}
	
	public List<LogEntry> getLogEntry(String agentName, Long fromMillisecond,
			Long toMillisecond) {
		return logDao.getLogEntry(agentName, fromMillisecond, toMillisecond);
	}
	
	public void persistLogEntry(LogEntry logEntry) {
		logDao.persistLogEntry(logEntry);
	}
	
	public void storeLog(String agentName, Long millisecond, String logMessage) {
		logDao.storeLog(agentName, millisecond, logMessage);
	}
}
