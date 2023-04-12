from datetime import datetime
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.events import EventFiringWebDriver
from selenium.common.exceptions import TimeoutException, NoSuchElementException
from behave import *


driver = webdriver.Chrome(
    service=Service(ChromeDriverManager().install()), # Baixa o driver em tempo de execução 
)

@given(u'I am at the "LoginPage"')
def step_impl(context):
    driver.get("http://localhost:3000")
    driver.execute_script("window.localStorage.setItem('user', '')")
    driver.refresh()


@when(u'I click at the "Register" button')
def step_impl(context):
    WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="root"]/div/div[2]/a'))).click()


@when(u'the page updates to the "RegisterPage"')
def step_impl(context):
    assert driver.title == "Podshare"


@when(u'I fill the username field with "user01" that is not contained at the system')
def step_impl(context):
    WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="field-:r0:"]'))).send_keys("user01")


@given(u'I fill the email field with "user@email.com" that is contained at the system')
def step_impl(context):
    WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="field-:r1:"]'))).send_keys("user@email.com")


@given(u'I fill the password with "R1CbsKa2", which satisfies the passwords conditions')
def step_impl(context):
    WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="field-:r1:"]'))).send_keys("R1CbsKa2")


@given(u'I set the birthday to "13/02/1998", where I am over 18 years')
def step_impl(context):
    WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="field-:r3:"]'))).send_keys("13/02/1998")


@given(u'thus not needing an responsible account')
def step_impl(context):
    pass


@when(u'I accept the "Terms of Service"')
def step_impl(context):
    pass


@when(u'Click at the "Complete Register" button')
def step_impl(context):
    WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="root"]/div/div[1]/div/button'))).click()


@then(u'my account is created and I am moved to the "Main Page"')
def step_impl(context):
    WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="root"]/div/div[1]/div/button'))).click()   

###########################################################################################################################################
###########################################################################################################################################
###########################################################################################################################################

@given(u'the following user already exist')
def step_impl(context):
    pass


@given(u'I am at the "Login Page"')
def step_impl_2(context):
    driver.get("http://localhost:3000")
    driver.execute_script("window.localStorage.setItem('user', '')")
    driver.refresh()

@given(u'I click at the "Register" button')
def step_impl_2(context):
    WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="root"]/div/div[2]/a'))).click()

@then(u'the page updates to the "Register Page"')
def step_impl_2(context):
    assert driver.title == "Podshare"


@given(u'I fill the username field with "user01" that is not contained at the system')
def step_impl(context):
    WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="field-:r0:"]'))).send_keys("user01")


@given(u'I fill the email field with "bola7@proton.me" which is contained at the system')
def step_impl(context):
    WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="field-:r1:"]'))).send_keys("bola7@email.com")


@then(u'A message shows up saying "Email already used!"')
def step_impl(context):
    driver.close()
    pass

# driver.close()

# driver.get("http://localhost:3000")
# driver.execute_script("window.localStorage.setItem('user', '')")
# driver.refresh()
# WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="root"]/div/div[2]/a'))).click()
# WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="field-:r0:"]'))).send_keys("user01")
# WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="field-:r1:"]'))).send_keys("user@email.com")
# WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="field-:r1:"]'))).send_keys("R1CbsKa2")
# WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="field-:r3:"]'))).send_keys("13/02/1998")
# WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="root"]/div/div[1]/div/button'))).click()
# WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="root"]/div/div[1]/div/button'))).click()
# driver.close()