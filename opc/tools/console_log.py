from datetime import datetime
from cprint import cprint


def console_info(msg):
    now_time = datetime.now().strftime("%d/%m/%Y %H:%M:%S.%f")
    cprint.info('%s [INFO] - %s' %(now_time, msg))

def console_warn(msg):
    now_time = datetime.now().strftime("%d/%m/%Y %H:%M:%S.%f")
    cprint.warn('%s [WARN] - %s' %(now_time, msg))

def console_err(msg):
    now_time = datetime.now().strftime("%d/%m/%Y %H:%M:%S.%f")
    cprint.err('%s [ERR] - %s' %(now_time, msg))

def console_ok(msg):
    now_time = datetime.now().strftime("%d/%m/%Y %H:%M:%S.%f")
    cprint.ok('%s [OK] - %s' %(now_time, msg))
